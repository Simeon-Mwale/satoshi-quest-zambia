/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bitcoin: {
          orange: '#F7931A',
          dark: '#0D0D0D',
          amber: '#FFB830',
          gold: '#D4AF37',
        },
        zambia: {
          green: '#198A00',
          red: '#CE1126',
          black: '#000000',
          orange: '#EF7D00',
        },
        surface: {
          900: '#0A0A0F',
          800: '#12121A',
          700: '#1A1A26',
          600: '#222233',
          500: '#2A2A40',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'coin-spin': 'coin-spin 0.6s ease-out',
        'slide-up': 'slide-up 0.4s ease-out',
        'shake': 'shake 0.4s ease-out',
        'streak-fire': 'streak-fire 1s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(247,147,26,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(247,147,26,0.6)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'coin-spin': {
          '0%': { transform: 'rotateY(0deg) scale(1)' },
          '50%': { transform: 'rotateY(180deg) scale(1.2)' },
          '100%': { transform: 'rotateY(360deg) scale(1)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-8px)' },
          '75%': { transform: 'translateX(8px)' },
        },
        'streak-fire': {
          '0%, 100%': { filter: 'hue-rotate(0deg) brightness(1)' },
          '50%': { filter: 'hue-rotate(20deg) brightness(1.3)' },
        },
      },
    },
  },
  plugins: [],
};
