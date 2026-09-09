/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#fc8019', // Signature Swiggy Orange
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        coral: {
          500: '#ff4b4b',
          600: '#e12b38',
        },
        foodVeg: '#0f8a3b',
        foodNonVeg: '#e23744',
        darkSurface: '#0f172a',
        darkCard: '#1e293b'
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
        'elevated': '0 20px 40px -8px rgba(0, 0, 0, 0.1), 0 8px 16px -4px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 25px 50px -12px rgba(252, 128, 25, 0.15), 0 10px 24px -6px rgba(0, 0, 0, 0.08)',
        'glow': '0 0 25px rgba(252, 128, 25, 0.35)',
        'glow-lg': '0 0 45px rgba(252, 128, 25, 0.45)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s infinite',
        'radar': 'radarWave 2.5s cubic-bezier(0, 0.2, 0.8, 1) infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'gradient-x': 'gradientX 10s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(252, 128, 25, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(252, 128, 25, 0)' },
        },
        radarWave: {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      }
    },
  },
  plugins: [],
}
