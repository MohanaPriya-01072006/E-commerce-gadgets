import React, { useMemo } from 'react';

/* ─── ball definitions ───────────────────────────────────────────────────────
   Each ball gets:
   • size     – diameter in px
   • top/left – starting position (%)
   • colors   – two stop colours for the radial gradient (gives a glassy look)
   • duration – float animation duration (s)
   • delay    – animation delay (s)
   • opacity  – overall opacity
──────────────────────────────────────────────────────────────────────────────*/
const BALLS = [
  // large anchors
  { id:1,  size:220, top:-6,  left:-5,  c1:'rgba(255,255,255,0.92)', c2:'rgba(147,197,253,0.55)', dur:8,  del:0,    op:1   },
  { id:2,  size:180, top:-4,  left:72,  c1:'rgba(255,255,255,0.88)', c2:'rgba(103,232,249,0.50)', dur:10, del:1.2,  op:1   },
  { id:3,  size:260, top:60,  left:80,  c1:'rgba(255,255,255,0.85)', c2:'rgba(147,197,253,0.60)', dur:12, del:0.5,  op:1   },
  { id:4,  size:200, top:65,  left:-6,  c1:'rgba(173,216,255,0.80)', c2:'rgba(37,99,235,0.25)',   dur:9,  del:2,    op:1   },
  // medium
  { id:5,  size:90,  top:12,  left:30,  c1:'rgba(255,255,255,0.75)', c2:'rgba(103,232,249,0.45)', dur:7,  del:0.8,  op:0.9 },
  { id:6,  size:70,  top:45,  left:50,  c1:'rgba(255,255,255,0.70)', c2:'rgba(147,197,253,0.50)', dur:11, del:1.5,  op:0.85},
  { id:7,  size:100, top:30,  left:88,  c1:'rgba(200,230,255,0.80)', c2:'rgba(37,99,235,0.20)',   dur:8.5,del:3,    op:0.9 },
  { id:8,  size:80,  top:55,  left:18,  c1:'rgba(255,255,255,0.72)', c2:'rgba(6,182,212,0.35)',   dur:9.5,del:0.3,  op:0.85},
  // small accent
  { id:9,  size:38,  top:20,  left:60,  c1:'rgba(255,255,255,0.90)', c2:'rgba(147,197,253,0.60)', dur:6,  del:1,    op:0.9 },
  { id:10, size:28,  top:38,  left:70,  c1:'rgba(220,240,255,0.85)', c2:'rgba(37,99,235,0.30)',   dur:7,  del:2.5,  op:0.8 },
  { id:11, size:22,  top:72,  left:42,  c1:'rgba(255,255,255,0.88)', c2:'rgba(103,232,249,0.50)', dur:5,  del:0.6,  op:0.75},
  { id:12, size:18,  top:48,  left:8,   c1:'rgba(200,230,255,0.80)', c2:'rgba(6,182,212,0.40)',   dur:6.5,del:1.8,  op:0.7 },
  { id:13, size:45,  top:82,  left:62,  c1:'rgba(255,255,255,0.80)', c2:'rgba(147,197,253,0.45)', dur:8,  del:0.4,  op:0.85},
  { id:14, size:35,  top:15,  left:48,  c1:'rgba(255,255,255,0.85)', c2:'rgba(103,232,249,0.40)', dur:9,  del:2.2,  op:0.8 },
  { id:15, size:55,  top:78,  left:28,  c1:'rgba(210,235,255,0.75)', c2:'rgba(37,99,235,0.22)',   dur:10, del:1.4,  op:0.8 },
  // tiny extras
  { id:16, size:14,  top:25,  left:15,  c1:'rgba(255,255,255,0.90)', c2:'rgba(147,197,253,0.55)', dur:5.5,del:0.9,  op:0.7 },
  { id:17, size:16,  top:62,  left:92,  c1:'rgba(200,230,255,0.88)', c2:'rgba(6,182,212,0.35)',   dur:6,  del:1.6,  op:0.65},
  { id:18, size:12,  top:88,  left:75,  c1:'rgba(255,255,255,0.85)', c2:'rgba(103,232,249,0.45)', dur:4.5,del:2.8,  op:0.6 },
];

function Ball({ id, size, top, left, c1, c2, dur, del, op }) {
  const animName = `floatBall${id % 4}`;
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        width: size,
        height: size,
        top: `${top}%`,
        left: `${left}%`,
        borderRadius: '50%',
        opacity: op,
        pointerEvents: 'none',
        zIndex: 0,
        /* 3-D glass radial gradient */
        background: `radial-gradient(circle at 32% 28%, ${c1} 0%, ${c2} 60%, rgba(37,99,235,0.08) 100%)`,
        /* highlight rim + reflection */
        boxShadow: [
          'inset 2px 4px 12px rgba(255,255,255,0.75)',
          'inset -2px -3px 8px rgba(0,0,0,0.06)',
          '0 8px 32px rgba(147,197,253,0.25)',
          '0 2px 8px rgba(37,99,235,0.10)',
        ].join(', '),
        border: '1px solid rgba(255,255,255,0.65)',
        animation: `${animName} ${dur}s ease-in-out ${del}s infinite`,
        willChange: 'transform',
      }}
    />
  );
}

export default function GlassBallsBackground() {
  return (
    <>
      {/* Keyframes injected once as a <style> tag */}
      <style>{`
        @keyframes floatBall0 {
          0%,100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          33%      { transform: translateY(-18px) translateX(6px) rotate(2deg); }
          66%      { transform: translateY(-8px) translateX(-10px) rotate(-1deg); }
        }
        @keyframes floatBall1 {
          0%,100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          40%      { transform: translateY(-24px) translateX(-8px) rotate(-3deg); }
          70%      { transform: translateY(-12px) translateX(12px) rotate(1.5deg); }
        }
        @keyframes floatBall2 {
          0%,100% { transform: translateY(0px) scale(1); }
          50%      { transform: translateY(-16px) scale(1.03); }
        }
        @keyframes floatBall3 {
          0%,100% { transform: translateY(0px) translateX(0px); }
          25%      { transform: translateY(-10px) translateX(14px); }
          75%      { transform: translateY(-20px) translateX(-6px); }
        }
      `}</style>

      {/* Fixed background layer — sits behind everything */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          background: 'linear-gradient(150deg, #f0f6ff 0%, #e8f0fe 30%, #f5f9ff 60%, #edf5ff 100%)',
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {/* Soft wave ribbons (pure CSS) */}
        <div style={{
          position: 'absolute', bottom: '20%', left: '-10%', width: '70%', height: '35%',
          background: 'linear-gradient(135deg, rgba(147,197,253,0.18) 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
          borderRadius: '60% 40% 70% 30% / 40% 60% 40% 60%',
          filter: 'blur(2px)',
          transform: 'rotate(-8deg)',
        }} />
        <div style={{
          position: 'absolute', top: '30%', right: '-8%', width: '55%', height: '30%',
          background: 'linear-gradient(135deg, rgba(103,232,249,0.12) 0%, rgba(255,255,255,0.35) 50%, transparent 100%)',
          borderRadius: '40% 60% 30% 70% / 60% 40% 60% 40%',
          filter: 'blur(2px)',
          transform: 'rotate(12deg)',
        }} />

        {/* All the balls */}
        {BALLS.map(b => <Ball key={b.id} {...b} />)}
      </div>
    </>
  );
}
