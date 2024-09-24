/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow : {
        customShadow : '0 6px 10px #757c7e1a, 0 3px 20px #757c7e26, 0 3px 4px #757c7e33'
      }
    },
  },
  plugins: [],
}

