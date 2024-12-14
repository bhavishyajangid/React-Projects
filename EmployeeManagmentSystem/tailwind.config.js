/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns :{
        "tasks" : "repeat(4 , minmax(150px , 1fr))",
      
      }, 
      gridTemplateRows : {
        "task" : 'repeat(2 , minmax(150px , 1fr)'
      }
    },
  },
  plugins: [],
}

