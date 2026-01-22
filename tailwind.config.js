/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        slate: {
          800: '#1e293b', // Adjusting for glass effect base if needed, but standard slate is fine.
          900: '#0f172a',
        },
        blue: {
          600: '#2563eb',
        }
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
