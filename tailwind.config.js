/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primary:   { DEFAULT: '#2563EB', 50: '#EFF6FF', 100: '#DBEAFE', 200: '#BFDBFE', 300: '#93C5FD', 400: '#60A5FA', 500: '#3B82F6', 600: '#2563EB', 700: '#1D4ED8', 800: '#1E40AF', 900: '#1E3A8A' },
        secondary: { DEFAULT: '#0F172A', 50: '#F8FAFC', 100: '#F1F5F9', 200: '#E2E8F0', 300: '#CBD5E1', 400: '#94A3B8', 500: '#64748B', 600: '#475569', 700: '#334155', 800: '#1E293B', 900: '#0F172A' },
        accent:    { DEFAULT: '#06B6D4', 50: '#ECFEFF', 100: '#CFFAFE', 200: '#A5F3FC', 300: '#67E8F9', 400: '#22D3EE', 500: '#06B6D4', 600: '#0891B2', 700: '#0E7490' },
        success:   '#22C55E',
        warning:   '#F59E0B',
        danger:    '#EF4444',
      },
      fontFamily: {
        sans:    ['Inter', 'Poppins', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
        '4xl': '1.5rem',
      },
      boxShadow: {
        /* Standard card shadows */
        card:         '0 4px 24px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
        'card-hover': '0 12px 40px rgba(37,99,235,0.12), 0 2px 8px rgba(0,0,0,0.06)',

        /* 3D Glass shadows */
        glass:        '0 8px 32px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)',
        'glass-lg':   '0 20px 60px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)',
        'glass-blue': '0 16px 48px rgba(37,99,235,0.18), 0 4px 12px rgba(37,99,235,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',

        /* Floating / elevation */
        float:        '0 20px 60px rgba(37,99,235,0.18), 0 4px 16px rgba(0,0,0,0.06)',
        'float-sm':   '0 8px 24px rgba(37,99,235,0.12), 0 2px 6px rgba(0,0,0,0.04)',

        /* Inner top highlight (3D bevel) */
        bevel:        'inset 0 2px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.06)',

        /* Sphere / orb */
        sphere:       'inset 2px 3px 10px rgba(255,255,255,0.8), inset -2px -3px 10px rgba(0,0,0,0.08), 0 8px 32px rgba(37,99,235,0.15)',

        /* Input focus ring */
        'input-focus': '0 0 0 3px rgba(37,99,235,0.12), 0 4px 16px rgba(37,99,235,0.08)',
      },
      backdropBlur: {
        xs:  '2px',
        sm:  '8px',
        md:  '16px',
        lg:  '24px',
        xl:  '32px',
        '2xl': '48px',
      },
      animation: {
        'fade-in':    'fadeIn 0.4s ease forwards',
        'slide-up':   'slideUp 0.5s ease forwards',
        'slide-in':   'slideIn 0.35s ease forwards',
        marquee:      'marquee 32s linear infinite',
        'spin-slow':  'spin 3s linear infinite',
        float:        'float 3.5s ease-in-out infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        pulse2:       'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite',
        'sphere-pop': 'spherePop 0.6s cubic-bezier(0.175,0.885,0.32,1.275) forwards',
      },
      keyframes: {
        fadeIn:     { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp:    { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideIn:    { from: { opacity: '0', transform: 'translateX(-16px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        marquee:    { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        float:      { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        floatSlow:  { '0%,100%': { transform: 'translateY(0) rotate(0deg)' }, '50%': { transform: 'translateY(-16px) rotate(3deg)' } },
        spherePop:  { '0%': { transform: 'scale(0.8)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
};
