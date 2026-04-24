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
          light: '#FDFBF7',
          DEFAULT: '#C5A059', // Rose Gold
          dark: '#B48E46',
        },
        surface: {
          light: '#FFFFFF',
          DEFAULT: '#FDFBF7',
          dark: '#F8F5F0',
        },
        slate: {
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
