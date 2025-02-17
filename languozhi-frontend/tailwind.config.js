/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        1080: { min: '1080px' },
        2000: { min: '2000px' },
        1280: { max: '1280px' }
      }
    }
  },
  plugins: []
}
