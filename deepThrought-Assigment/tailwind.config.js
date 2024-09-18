import Navbar from './src/Components/Navbar';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow : {
       navbarShadow : '0px 4px 4px 0px #00000040' ,
       CardsShadow : '0px -4px 4px 0px #00000040, 0px 4px 4px 0px #00000040' ,
       InnerBoxShadow: '1px 3px 8px 0px #00000040' , 
       BtnShadow: '0px 2px 4px 0px #00000040' ,
       InputShadow: '-2px 2px 6px 0px #00000026',
       contentShadow: '0px 2px 10px 0px #0000002E',
       NoticeBoard: '0px -4px 4px 0px #00000040 ,0px 4px 4px 0px #00000040'


      }, 
      fontFamily : {
        poppins : 'poppins' , 
        opensans: 'Open Sans' ,
        roboto : 'Roboto' ,

      }, 
      borderRadius: {
        'custom': '0px 20px 20px 20px',
      },
    
    
    },
  },
  plugins: [],
}

