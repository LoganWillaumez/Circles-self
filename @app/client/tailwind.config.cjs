/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors :{
        fill: "var(--fill)",
      }
    },
  },
  plugins: [],
}
