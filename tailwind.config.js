/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        lake: '#3BB6E8',
        mountain: '#0F2A44',
        sky: '#EAF7FF',
        aqua: '#22E3C0',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Unbounded', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 10px 60px rgba(34, 227, 192, 0.25)',
        glass: '0 20px 60px rgba(8, 24, 45, 0.22)',
      },
      backgroundImage: {
        'hero-grid': 'radial-gradient(circle at 20% 20%, rgba(59, 182, 232, 0.2), transparent 45%), radial-gradient(circle at 85% 10%, rgba(34, 227, 192, 0.18), transparent 40%), radial-gradient(circle at 50% 100%, rgba(234, 247, 255, 0.12), transparent 45%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '0.95', transform: 'scale(1.06)' },
        },
        shine: {
          '0%': { transform: 'translateX(-130%)' },
          '100%': { transform: 'translateX(130%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 5s ease-in-out infinite',
        shine: 'shine 2.6s linear infinite',
        'fade-up': 'fadeUp 700ms ease-out both',
      },
    },
  },
  plugins: [],
};
