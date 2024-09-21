import React from 'react'
import right from '../assets/right.svg'
import myImage from '../assets/innerslide.svg'
import girl from '../assets/girl.png'
import tshirt from '../assets/tshirtnew.png'
import { BsPlayCircle } from "react-icons/bs";
import Features from './Features';
const Main = () => {
  return (
    <>
    <div className='w-11/12 max-w-[1280px] px-6 py-14 m-auto h-screen  flex justify-between bg-contain bg-no-repeat bg-right overflow-hidden mt-20  ' style={{ backgroundImage: `url(${myImage})` }}>
        <div className='w-[40%] min-w-[350px]   flex flex-col justify-center bg-red-400 max-lg:justify-start max-lg:pt-10' >
         <h1 className='text-[56px] font-medium leading-[72px] text-[#17262b] font-sans max-lg:text-4xl'>Create and sell  custom products</h1>

         <ul className='w-full  text-[#485256] font-medium mt-5 '>
            <li><img className=' inline-block ml-3' src={right} alt="img" /><span className='ml-3  max-lg:text-sm'>100% Free to use</span></li>
            <li><img className=' inline-block ml-3' src={right} alt="img" /><span className='ml-3  max-lg:text-sm'>900+ High-Quality Products</span></li>
            <li><img className= 'inline-block ml-3' src={right} alt="img" /><span className='ml-3 max-lg:text-sm'>Largest global print network</span></li>
           
         </ul>

         <div className='w-full flex items-center mt-10'>
      <button className='h-12 leading-[24px] px-8 py-3 bg-[#39b75d] text-[#fff] rounded-[3px] font-medium text-[16px] mr-4 hover:bg-green-600 transition-colors duration-150 '>Start for free</button>
      <button className='h-12 leading-[24px] px-6 border border-solid border-[#c2c2c2] text-[#353a47]  rounded-[3px] font-medium text-[16px] inline-flex items-center gap-2 hover:text-[#39b75d]  transition-colors duration-150'>
        <BsPlayCircle className='text-[#353a47]' />How its work?</button>
         </div>
         <span className='text-[#39b65e] font-medium leading-[23px] mt-4 max-lg:text-sm'>Trusted by over 8M sellers around the world</span>
        </div>

        <div className='w-[500px] h-full flex items-center relative bg-green-300 '>
          <div className='w-72 h-[300px] bg-[#FFFEFF] rounded-xl overflow-hidden p-4 border border-solid border-[#c2c2c2] mt-20 ml-14'>
             <img className='w-full h-full' src={tshirt} alt="" />
          </div>
            <img className='h-96 absolute right-0' src={girl} alt="" />
        </div>
    </div>
    <Features/>
    </>
  )
}

export default Main