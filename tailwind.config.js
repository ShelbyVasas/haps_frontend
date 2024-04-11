/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'soft-gray': '#f1f1f6',
        'muted-blue': '#dbeafe',
        'pastel-purple': '#e9d5ff',
      },
    },
  },
  plugins: [],
}