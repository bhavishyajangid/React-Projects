import React from 'react'
import heroimg from '../assets/heroimg.png'
const HeroImg = () => {
  return (
    <div className='w-4/5 max-lg:w-11/12 flex max-sm:flex-col border border-solid border-gray-500 m-auto'>
        <div className='w-full sm:w-1/2 flex flex-col items-center max-sm:items-start justify-center max-sm:py-10 max-sm:px-10'>
        <div className='leading-10  ' >
        <span className='text-md font-medium text-gray-600 max-sm:text-xs  '><span className='inline-block w-9 h-[2px] bg-gray-600 max-sm:h-[1.5px]'></span>OUR BESTSELLERS</span>
        <h1 className='text-5xl text-[#414753] prata-regular  max-md:text-3xl '>Latest Arrivals</h1>
        <span className='text-md max-sm:text-xs font-semibold inline-block  text-gray-900'>SHOP NOW<span className='inline-block w-9 max-sm:h-[1.5px] h-[2px] bg-gray-900'></span></span>
        </div>
        </div>
            <img className='w-full sm:w-1/2 h-full' src={heroimg} alt="img" />
    </div>
  )
}

export default HeroImg