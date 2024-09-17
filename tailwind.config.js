/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./views/**/*.{html,js}",
    "./public/**/*.{html,js}"
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}
