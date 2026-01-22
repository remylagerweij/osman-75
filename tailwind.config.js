/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        background: '#09090b', // Zinc 950 - True Dark
        surface: '#18181b', // Zinc 900
        'gs-red': '#A90432',
        'gs-yellow': '#FDB912',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pop': 'pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      keyframes: {
        pop: {
          'from': { transform: 'scale(0.95)', opacity: '0' },
          'to': { transform: 'scale(1)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
