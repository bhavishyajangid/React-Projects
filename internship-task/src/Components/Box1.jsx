import React, { useRef, useState } from 'react';
import question from '../assets/question.png';
import square from '../assets/square.png';

const Box1 = () => {
  const [btnClicked , setBtnClicked] = useState(1)
  const handleBtn = (event) =>{
   
    
     setBtnClicked(event.target.value)
    
              
              
            
               
  }
  return (
    <div className=' w-full 2xl:w-[720px] 2xl:ml-20 h-[47%]   flex flex-col items-center max-xl:w-[48%] max-xl:h-[325px] max-lg:w-11/12  '>

    <div className='w-full 2xl:w-[720px] h-[270px] 2xl:h-[319px] bg-[#363C43] shadow-boxFirstShadow rounded-[19px]  py-4 px-3 flex relative  max-xl:h-[300px] '>
      
      {/* Flex container for images */}
      <div className='w-5 h-40 max-w-6 flex flex-col justify-between items-center'>
        <img className='w-5 h-5 max-w-6 max-h-6' src={question} alt="Question Icon" />
        <img className='w-5 h-[30px] max-w-6 rounded-[3px]' src={square} alt="Square Icon" />
      </div>

      <div className='w-[90%]  2xl:w-[614px] ml-[18px] h-full flex flex-col'>
        
        {/* Header */}
        <div className=' w-full  h-[62px] rounded-[23px] bg-[#171717] shadow-navShadow flex items-center justify-evenly relative'>
          <button onClick={(event) => {handleBtn(event)}} value={1} className={`${btnClicked == 1 ? ' text-[#FFFFFF]  nohover' : 'text-[#A3ADB2] btn'} max-2xl:text-lg`} id='element'>
            About Me
          </button>
          <button onClick={(event) => {handleBtn(event)}} value={2} className={`${btnClicked == 2 ? ' text-[#FFFFFF]  nohover' : 'text-[#A3ADB2] btn'} max-2xl:text-lg`} id='element'>
            Experiences
          </button>
          <button onClick={(event) => {handleBtn(event)}} value={3} className={`${btnClicked == 3 ? 'text-[#FFFFFF]  nohover' : 'text-[#A3ADB2] btn'} max-2xl:text-lg`} id='element'>
            Recommended
          </button>
          <span className={` w-[32%] h-[80%] bg-[#28292F] rounded-2xl absolute z-0 ${btnClicked == 2 ? 'left-[34%]' : 
          btnClicked == 3 ? 'left-[67%]'
           : 'left-[5px]'
          } `} id='bgspan'></span>
        </div>

        {/* Content */}
        <div className='w-full mt-6 2xl:mt-6 h-[200px] text-left overflow-y-auto' id='para'>
          <p className='font-jakarta text-[17px] 2xl:text-xl text-[#969696]'>
            Hello! I’m Dave, your sales rep here from Salesforce. I’ve been working at this awesome company for 3 years now.
            <br />
            <br />
            I was born and raised in Albany, NY and have been living in Santa Carla for the past 10 years with my wife Tiffany and my 4-year-old twin daughters, Emma and Ella. Both of them are just starting school, so my calendar is usually blocked between 9-10 AM. This is a...
          </p>
        </div>
      </div>

      {/* Decorative element */}
      <div className='w-2 h-16 rounded-[8px] bg-background shadow-Lineshadow absolute top-[110px] right-3'></div>
    </div>
    <div className=' w-[90%] 2xl:w-[612px]  h-[4px] bg-bigLine shadow-bigLine rounded-[3px]  mt-3 2xl:mt-4'></div>
    </div>
  );
};

export default Box1;
