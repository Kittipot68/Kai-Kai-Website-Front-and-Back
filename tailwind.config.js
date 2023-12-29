/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
    ,
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}' // Flowbite path inclusion
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // Other existing plugins
    require('flowbite/plugin') // Adding Flowbite plugin
  ],}

