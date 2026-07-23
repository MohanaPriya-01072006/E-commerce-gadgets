/**
 * MoPrix Helper — Recommendation Engine
 *
 * Parses a free-text query and scores every product against:
 *   1. Budget match        (30 pts)
 *   2. Category match      (25 pts)
 *   3. Usage / keyword     (25 pts)
 *   4. Spec match          (10 pts)
 *   5. Quality bonus       (10 pts — rating + reviews)
 *
 * Returns top-N results with an array of human-readable reason strings.
 */

// ── Keyword → category + usage mapping ─────────────────────────────────────
const USAGE_MAP = [
  // Laptops
  { keywords: ['laptop','notebook','macbook','thinkpad','xps','spectre','zephyrus'], category: 'laptops', usages: ['laptop'] },
  { keywords: ['programming','coding','developer','code','python','web development','software'], category: 'laptops', usages: ['programming','developer'] },
  { keywords: ['ai','machine learning','deep learning','data science','ml','neural'], category: 'laptops', usages: ['ai','gpu'] },
  { keywords: ['gaming laptop','game','games','play'], category: ['laptops','gaming'], usages: ['gaming'] },
  { keywords: ['video editing','3d rendering','render','adobe','after effects','premiere'], category: 'laptops', usages: ['gpu','creative'] },
  { keywords: ['office','work','business','presentation','excel','word','enterprise'], category: 'laptops', usages: ['office'] },
  { keywords: ['college','student','university','study'], category: 'laptops', usages: ['student'] },

  // Smartphones
  { keywords: ['phone','mobile','smartphone','iphone','samsung','oneplus','pixel','xiaomi'], category: 'smartphones', usages: ['phone'] },
  { keywords: ['camera phone','photography','photo','vlog','youtube','content creator'], category: 'smartphones', usages: ['camera'] },
  { keywords: ['5g','fast network','network'], category: 'smartphones', usages: ['5g'] },

  // Audio
  { keywords: ['headphone','headphones','over-ear','noise cancel','anc','wh-1000'], category: 'headphones', usages: ['audio','anc'] },
  { keywords: ['earbuds','earphone','airpods','tws','wireless earphone'], category: 'earbuds', usages: ['audio','wireless'] },
  { keywords: ['speaker','bluetooth speaker','portable speaker','jbl','marshall'], category: 'speakers', usages: ['audio'] },
  { keywords: ['music','listen','sound','audio','bass'], category: ['headphones','earbuds','speakers'], usages: ['audio'] },
  { keywords: ['calls','meeting','conference','zoom','teams','wfh','work from home'], category: 'headphones', usages: ['calls','anc'] },

  // Wearables
  { keywords: ['watch','smartwatch','wearable','fitness','health','heart rate','ecg'], category: 'smartwatches', usages: ['fitness','health'] },
  { keywords: ['running','cycling','sport','athlete','marathon','outdoor'], category: 'smartwatches', usages: ['fitness','gps'] },

  // Tablets
  { keywords: ['tablet','ipad','surface','drawing','sketch','stylus','pen'], category: 'tablets', usages: ['tablet','creative'] },
  { keywords: ['reading','ebook','kids','learning'], category: 'tablets', usages: ['tablet'] },

  // Gaming
  { keywords: ['console','playstation','ps5','nintendo','switch','gaming console'], category: 'gaming', usages: ['gaming'] },
  { keywords: ['keyboard','mechanical keyboard','gaming keyboard'], category: 'keyboards-mice', usages: ['gaming','typing'] },
  { keywords: ['mouse','gaming mouse','wireless mouse'], category: 'keyboards-mice', usages: ['gaming','productivity'] },

  // Smart home
  { keywords: ['smart home','alexa','echo','google home','hue','smart light','iot'], category: 'smart-home', usages: ['smarthome'] },
  { keywords: ['tv','television','qled','oled','8k','4k'], category: 'smart-home', usages: ['entertainment'] },
];

// ── Spec keywords that map to product spec strings ──────────────────────────
const SPEC_KEYWORDS = [
  { terms: ['16gb','16 gb ram','16gb ram'],        specHint: '16GB', label: '16 GB RAM — ideal for multitasking & AI workloads' },
  { terms: ['32gb','32 gb ram','32gb ram'],        specHint: '32GB', label: '32 GB RAM — excellent for heavy workloads' },
  { terms: ['ssd','fast storage','nvme'],           specHint: 'SSD',  label: 'SSD storage — fast app & system performance' },
  { terms: ['dedicated gpu','rtx','nvidia','amd gpu','graphics card'], specHint: 'GPU', label: 'Dedicated GPU — great for gaming & AI' },
  { terms: ['oled','amoled','retina'],              specHint: 'OLED', label: 'OLED/AMOLED display — vibrant, accurate colours' },
  { terms: ['anc','noise cancel','noise cancelling'], specHint: 'ANC', label: 'Active Noise Cancellation — focus anywhere' },
  { terms: ['5g'],                                  specHint: '5G',   label: '5G connectivity — ultra-fast mobile data' },
  { terms: ['long battery','all day battery'],      specHint: 'Battery', label: 'Long battery life — lasts all day' },
  { terms: ['lightweight','light weight','thin'],   specHint: 'Weight', label: 'Lightweight design — easy to carry' },
  { terms: ['waterproof','water resistant','ip67','ip68','ipx4'], specHint: 'Water', label: 'Water resistance — protected in all conditions' },
  { terms: ['gps','navigation'],                    specHint: 'GPS',  label: 'Built-in GPS — precise location tracking' },
  { terms: ['120hz','144hz','high refresh'],        specHint: '120Hz', label: 'High refresh rate display — super smooth' },
  { terms: ['fast charge','quick charge','supervooc','warp'], specHint: 'W', label: 'Fast charging — back to full in minutes' },
];

// ── Budget extraction from text ──────────────────────────────────────────────
function parseBudget(text) {
  const t = text.toLowerCase();

  // "under 80000", "below 80k", "₹80,000", "80000 rupees", "80k budget"
  const patterns = [
    /(?:under|below|within|upto|up to|max|maximum|budget|around|about|≤|<=)?\s*₹?\s*(\d[\d,]*)\s*k/,
    /(?:under|below|within|upto|up to|max|maximum|budget|around|about|≤|<=)?\s*₹?\s*(\d[\d,]+)/,
  ];

  for (const pat of patterns) {
    const m = t.match(pat);
    if (m) {
      let val = parseFloat(m[1].replace(/,/g, ''));
      if (val < 1000) val *= 1000; // "80k" → 80000
      if (val >= 500 && val <= 2000000) return val;
    }
  }
  return null;
}

// ── Category + usage extraction ──────────────────────────────────────────────
function parseIntent(text) {
  const t = text.toLowerCase();
  const matchedCategories = new Set();
  const matchedUsages     = new Set();

  for (const entry of USAGE_MAP) {
    if (entry.keywords.some(k => t.includes(k))) {
      const cats = Array.isArray(entry.category) ? entry.category : [entry.category];
      cats.forEach(c => matchedCategories.add(c));
      entry.usages.forEach(u => matchedUsages.add(u));
    }
  }

  return { categories: [...matchedCategories], usages: [...matchedUsages] };
}

// ── Score a single product against parsed intent ─────────────────────────────
function scoreProduct(product, budget, categories, usages, rawText) {
  const text = rawText.toLowerCase();
  let score = 0;
  const reasons = [];
  const misses  = [];

  // ── 1. Budget (30 pts) ───────────────────────────────────────────────────
  if (budget) {
    if (product.price <= budget) {
      const ratio = product.price / budget;
      if (ratio <= 0.7)       { score += 30; reasons.push(`✓ Well within your budget (₹${product.price.toLocaleString()} vs ₹${budget.toLocaleString()})`); }
      else if (ratio <= 0.9)  { score += 27; reasons.push(`✓ Within your budget (₹${product.price.toLocaleString()})`); }
      else                    { score += 22; reasons.push(`✓ Fits your budget (₹${product.price.toLocaleString()})`); }
    } else {
      const over = Math.round(((product.price - budget) / budget) * 100);
      if (over <= 10)  { score += 14; misses.push(`⚠ Slightly over budget by ${over}% — worth considering for the specs`); }
      else if (over <= 20) { score += 6; misses.push(`✗ ${over}% over your budget`); }
      else             { /* no points */ misses.push(`✗ Exceeds your budget significantly`); }
    }
  } else {
    score += 15; // no budget constraint — neutral
  }

  // ── 2. Category match (25 pts) ───────────────────────────────────────────
  if (categories.length > 0) {
    if (categories.includes(product.category)) {
      score += 25;
      reasons.push(`✓ Exact category match — ${product.category}`);
    }
  } else {
    score += 12;
  }

  // ── 3. Usage / keyword scoring (25 pts) ─────────────────────────────────
  let usageScore = 0;
  const usageReasons = [];

  const usageRules = [
    { usage: 'programming', check: () => product.category === 'laptops', reason: 'Suitable for programming & software development' },
    { usage: 'ai',          check: () => {
        const sp = (product.specs || []).join(' ').toLowerCase();
        return sp.includes('gpu') || sp.includes('rtx') || sp.includes('m3') || sp.includes('m4') || sp.includes('32gb') || sp.includes('16gb');
      }, reason: 'Capable of AI & machine learning workloads' },
    { usage: 'gaming',      check: () => {
        const sp = (product.specs || []).join(' ').toLowerCase();
        return product.category === 'gaming' || sp.includes('rtx') || sp.includes('gpu') || sp.includes('144hz') || sp.includes('120hz');
      }, reason: 'Suitable for gaming' },
    { usage: 'student',     check: () => ['laptops','tablets','smartphones'].includes(product.category), reason: 'Good choice for students' },
    { usage: 'creative',    check: () => {
        const sp = (product.specs || []).join(' ').toLowerCase();
        return sp.includes('oled') || sp.includes('retina') || sp.includes('gpu') || sp.includes('rtx');
      }, reason: 'Great for creative & design work' },
    { usage: 'office',      check: () => ['laptops','tablets'].includes(product.category), reason: 'Well-suited for office & productivity tasks' },
    { usage: 'fitness',     check: () => product.category === 'smartwatches', reason: 'Designed for fitness tracking' },
    { usage: 'gps',         check: () => { const sp = (product.specs || []).join(' ').toLowerCase(); return sp.includes('gps'); }, reason: 'Includes GPS tracking' },
    { usage: 'audio',       check: () => ['headphones','earbuds','speakers'].includes(product.category), reason: 'Optimised for audio' },
    { usage: 'anc',         check: () => { const sp = (product.specs || []).join(' ').toLowerCase(); return sp.includes('anc') || sp.includes('noise'); }, reason: 'Features Active Noise Cancellation' },
    { usage: 'camera',      check: () => { const sp = (product.specs || []).join(' ').toLowerCase(); return sp.includes('mp') || sp.includes('camera'); }, reason: 'Excellent camera system' },
    { usage: '5g',          check: () => { const sp = (product.specs || []).join(' ').toLowerCase(); return sp.includes('5g'); }, reason: '5G connectivity included' },
    { usage: 'wireless',    check: () => { const sp = (product.specs || []).join(' ').toLowerCase(); return sp.includes('bluetooth') || sp.includes('wireless'); }, reason: 'Wireless connectivity' },
    { usage: 'smarthome',   check: () => product.category === 'smart-home', reason: 'Designed for smart home use' },
    { usage: 'calls',       check: () => { const sp = (product.specs || []).join(' ').toLowerCase(); return sp.includes('multipoint') || sp.includes('anc') || sp.includes('call'); }, reason: 'Clear call quality & microphone' },
    { usage: 'developer',   check: () => product.category === 'laptops', reason: 'Perfect for development work' },
    { usage: 'entertainment', check: () => ['gaming','smart-home','tablets'].includes(product.category), reason: 'Great for entertainment' },
  ];

  let usageHits = 0;
  for (const rule of usageRules) {
    if (usages.includes(rule.usage) && rule.check()) {
      usageHits++;
      usageReasons.push(`✓ ${rule.reason}`);
    }
  }

  if (usages.length > 0) {
    const ratio = usageHits / usages.length;
    usageScore = Math.round(ratio * 25);
    reasons.push(...usageReasons);
    if (usageHits === 0 && usages.length > 0) {
      misses.push(`✗ Doesn't match your primary use case`);
    }
  } else {
    usageScore = 12;
  }
  score += usageScore;

  // ── 4. Spec keyword match (10 pts) ──────────────────────────────────────
  const specStr = (product.specs || []).join(' ').toUpperCase();
  let specHits = 0;
  for (const sk of SPEC_KEYWORDS) {
    if (sk.terms.some(t => text.includes(t)) && specStr.includes(sk.specHint.toUpperCase())) {
      specHits++;
      reasons.push(`✓ ${sk.label}`);
    }
  }
  score += Math.min(specHits * 3, 10);

  // ── 5. Quality bonus (10 pts) ────────────────────────────────────────────
  if (product.rating >= 4.8) {
    score += 10;
    reasons.push(`✓ Highly rated at ${product.rating}★ (${(product.reviews || 0).toLocaleString()} reviews)`);
  } else if (product.rating >= 4.5) {
    score += 6;
    reasons.push(`✓ Well rated at ${product.rating}★`);
  } else {
    score += 3;
  }

  // ── Clamp & return ───────────────────────────────────────────────────────
  const finalScore = Math.min(Math.round(score), 99);

  // Keep only unique reasons
  const allReasons = [...new Set([...reasons, ...misses])];

  return { score: finalScore, reasons: allReasons };
}

// ── Main export ───────────────────────────────────────────────────────────────
export function getRecommendations(query, products, topN = 5) {
  if (!query.trim() || !products.length) return [];

  const budget     = parseBudget(query);
  const { categories, usages } = parseIntent(query);

  const scored = products
    .filter(p => p.inStock !== false)
    .map(p => {
      const { score, reasons } = scoreProduct(p, budget, categories, usages, query);
      return { product: p, score, reasons };
    })
    .filter(r => r.score > 15)            // discard totally irrelevant
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);

  return scored;
}

export function extractSummary(query) {
  const budget = parseBudget(query);
  const { categories, usages } = parseIntent(query);
  return { budget, categories, usages };
}
