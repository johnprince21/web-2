/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#F97316',
        "primary-200": "#fabd93",
        "primary-500": "#fa822f",
        "primary-700": "#f76f11"
      },
    },
  },
  plugins: [],
}

