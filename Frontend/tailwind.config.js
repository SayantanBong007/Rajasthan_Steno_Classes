/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        '2xl': '1535px',
        'xl': '1279px',
        'lg': '1023px',
        'md': '767px',
        'sm': '639px',
      },
    },
  },
  plugins: [],
}

