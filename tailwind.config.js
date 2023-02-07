/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      "fontFamily": {
        "inter": 'Inter, sans-serif',
      },
      "colors":{
        "main-purple": "#4D1965",
        "main-rose": "#7b214c",
        "secondary-rose": "#EBBFFF50",
      }
    },
  },
  plugins: [],
}