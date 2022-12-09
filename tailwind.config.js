/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    screen: {
      'md': '768px',
      // => @media (min-width: 768px) { ... }
    },
    extend: {
      colors: {
        'primary': '#FFD370',
        'secondary': '#333333',
        'third':'#9F9A91',
        'light_gray':'#E5E5E5',
      },
    },
    container: {
      padding: '32px',
      center: true,
    },
  },
  plugins: [],
}
