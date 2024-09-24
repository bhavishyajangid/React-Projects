import React from 'react'
import right from '../assets/right.svg'
import myImage from '../assets/innerslide.svg'
import fullimage from '../assets/fullgirlimage.png'
import { BsPlayCircle } from "react-icons/bs";

const Main = () => {
  return (
    <>
    <div className='w-11/12  max-w-[1280px] px-6 py-14 m-auto   flex justify-between bg-contain bg-no-repeat bg-right overflow-hidden mt-20  max-md:flex-col  max-md:py-0 max-md:justify-normal max-md:px-5 max-sm:mt-5 max-md:bg-bottom  max-md:items-center' style={{ backgroundImage: `url(${myImage})` }}>
        <div className='w-[40%]  flex flex-col justify-center max-lg:justify-start max-md:pt-10 max-md:w-full  md:min-w-[350px] ' >
         <h1 className='text-[56px] font-medium leading-[72px] text-[#17262b] font-sans max-lg:text-4xl'>Create and sell  custom products</h1>

         <ul className='w-full  text-[#485256] font-medium mt-5 '>
            <li><img className=' inline-block ml-3' src={right} alt="img" /><span className='ml-3  max-lg:text-sm'>100% Free to use</span></li>
            <li><img className=' inline-block ml-3' src={right} alt="img" /><span className='ml-3  max-lg:text-sm'>900+ High-Quality Products</span></li>
            <li><img className= 'inline-block ml-3' src={right} alt="img" /><span className='ml-3 max-lg:text-sm'>Largest global print network</span></li>
           
         </ul>

         <div className='w-full flex items-center mt-10 max-[430px]:flex-col max-[430px]:gap-3'>
      <button className='h-12 leading-[24px] px-8 py-3 bg-[#39b75d] text-[#fff] rounded-[3px] font-medium text-[16px] mr-4 hover:bg-green-600 transition-colors duration-150 max-[430px]:mr-0 max-[430px]:w-2/3'>Start for free</button>
      <button className='h-12 leading-[24px] px-6 border border-solid border-[#c2c2c2] text-[#353a47]  rounded-[3px] font-medium text-[16px] inline-flex items-center gap-2 hover:text-[#39b75d]  transition-colors duration-150 max-[430px]:w-2/3'>
        <BsPlayCircle className='text-[#353a47]' />How its work?</button>
         </div>
         <span className='text-[#39b65e] font-medium leading-[23px] mt-4 max-lg:text-sm'>Trusted by over 8M sellers around the world</span>
        </div>

        <div className='w-[500px]  flex items-center  max-sm:w-full max-sm:mt-5  '>
            <img  className=' mix-blend-darken' src={fullimage} alt="" />
        </div>
    </div>
  
    </>
  )
}

export default Main