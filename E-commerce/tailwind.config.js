/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : 'Outfit' , 
      gridTemplateColumns: {
        // Add custom responsive columns
        responsive: 'repeat(auto-fill, minmax(200px, 1fr))',
        policycard: 'repeat(auto-fill, minmax(280px, 1fr))',
      },

    },
  },
  plugins: [],
}

