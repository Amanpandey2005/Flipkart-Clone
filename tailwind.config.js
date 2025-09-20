/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'flipkart-blue': '#2874f0',
        'flipkart-yellow': '#f0f0f0',
        'flipkart-orange': '#ff9f00',
        'flipkart-green': '#388e3c',
        'flipkart-red': '#e53935',
      },
      fontFamily: {
        'sans': ['Roboto', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
