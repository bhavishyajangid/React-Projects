import React, { useRef } from 'react';
import boximg from '../assets/boximg.png';

const Image = ({item}) => {
 
  return (
    
    <span  className=' w-[150px] h-[145px] 2xl:w-[190px] 2xl:h-[179px] overflow-hidden rounded-2xl 2xl:rounded-[24px] bg-[#00000033] transition-transform duration-300 ease-in-out transform hover:scale-[1.05] hover:shadow-boxShadow1 hover:-rotate-2'>
      <img 
        className='w-full h-full grayscale hover:grayscale-0 transition-all  duration-300 ' 
        src={item.url} 
        alt="Box" 
      />
    </span>
   
  );
}

export default Image;
