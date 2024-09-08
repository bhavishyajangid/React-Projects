/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     
      backgroundImage: {
        customGradient : 'linear-gradient(180deg, #373E44 -100%, #191B1F 100%)',
        customMultipleGradients: 'linear-gradient(180deg, rgba(40, 40, 40, 0.1) 0%, rgba(248, 248, 248, 0.1) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
        customGradinatLine : 'linear-gradient(177.32deg, #888989 5.6%, #4A4E54 93.28%)' ,
      lineGradiant: 'linear-gradient(180deg, rgba(40, 40, 40, 0.1) 0%, rgba(248, 248, 248, 0.1) 100%), linear-gradient(0deg, rgba(255, 255))' ,

      background: 'linear-gradient(177.32deg, #888989 5.6%, #4A4E54 93.28%)' ,
     bigLine: 'linear-gradient(180deg, rgba(40, 40, 40, 0.1) 0%, rgba(248, 248, 248, 0.1) 100%), linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
     rightBtn: 'linear-gradient(139.14deg, #303439 12.4%, #161718 94.96%)' ,
 






      },

      boxShadow : {
        boxFirstShadow: '5.67px 5.67px 3.78px 0px #00000066' ,
        navShadow: '0px 4.96px 12.4px 2.48px #00000040 inset' , 
        boxShadow1:'13.49px 16.87px 67.47px 8.43px rgba(10, 10, 10, 1)', 
        boxShadow2 :'-8.43px -16.87px 50.6px -16.87px rgba(72, 91, 113, 1)' ,
        Lineshadow: '4px 4px 4.9px 0px #00000040' ,
        bigLine: '0px 4px 4px 0px #00000054' ,
        galleryShadow: '0px 4px 10px 2px #00000040 inset',   
        rightBtn: '4px 5px 30px 5px #101213, -5px -3px 30px -10px #96BEE7' ,
        addBtn: '0 3.26px 3.26px #ffffff26 inset, 0 0 48.91px #ffffff0d inset, 9px 10px 7.1px #0006, -.5px -.5px 6.9px #ffffff40'





      } ,


      colors : {
        primary : '#FFFFFF' , 
        LeftContainer : '#363C43' ,
        RightContainer : '#616161D1' ,
        navbar : '#171717' ,
        button : '#28292F'

       
      } , 

      fontFamily : {
        poppins : 'poppins' ,
        jakarta : 'Plus Jakarta Sans'
      } ,
      
     
    },
  },
  plugins: [],
}

