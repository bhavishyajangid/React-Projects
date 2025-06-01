/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
  'bg-blue-400',
  'bg-yellow-400',
  'bg-green-400',
  'bg-red-400',
  'bg-teal-500',
  'bg-yellow-500',
  'bg-red-500',
  'border-blue-400',
  'border-yellow-400',
  'border-green-400',
  'border-red-400',
  'border-teal-500',
  'border-yellow-500',
  'border-red-500',
],
  theme: {
    extend: {
      gridTemplateColumns :{
        "tasks" : "repeat(4 , minmax(150px , 1fr))",
      
      }, 
      gridTemplateRows : {
        "task" : 'repeat(2 , minmax(150px , 1fr)'
      }, colors: {
      primary: {
        500: '#0D9488',
        600: '#0F766E',
      },
    },
    },
  },
  plugins: [],
}

