/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        gala: {
          red: {
            50: '#fff0f3',
            100: '#ffe3e8',
            200: '#ffc9d2',
            300: '#ff9dad',
            400: '#ff647f',
            DEFAULT: '#A90432', // Main
            500: '#A90432',
            600: '#8A0329',
            700: '#750222',
            800: '#63021d',
            900: '#55021a', // Dark
          },
          yellow: {
            50: '#fffef0',
            100: '#fffbd6',
            200: '#fff5ad',
            300: '#ffea7d',
            400: '#ffda4b',
            DEFAULT: '#FDB912', // Main
            500: '#FDB912',
            600: '#d99806',
            700: '#ad7203',
            800: '#8c5908',
            900: '#75490b',
          },
        },
        neutral: {
          900: '#0a0a0a', // Premium OLED-like dark
          800: '#171717',
          700: '#262626',
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
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
