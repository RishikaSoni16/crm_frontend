/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.tsx"
  ],
  theme: {
    extend: {
      colors:{
        primary:"#ccc",
        customGray: '#B4B4B4',
        customorange: '#EA6D18',
        bordercolor: '#D0D0D0',
        tableheading:'#FFECDD',
        tablerow:'#F8F3EE',
      }
    },
  },
  plugins: [],
}

