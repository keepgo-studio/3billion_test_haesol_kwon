/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#040436',
        'pblue': '#003db3',
        'pslate': '#f1f5fe'
      }
    },
  },
  plugins: [],
}

