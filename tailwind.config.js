/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "raleWay":"'Raleway', 'sans-serif'",
        "poppin":"'Poppins', 'sans-serif'",
        "pop":"'Mochiy Pop One', 'sans-serif'",
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

