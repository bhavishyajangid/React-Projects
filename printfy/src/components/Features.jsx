import React from 'react'
import pig  from '../assets/pig.svg'
import rocket from '../assets/rocket.svg'
import mobile from '../assets/mobile.svg'

const Features = () => {
  return (
    
    <div className='w-11/12  max-w-[1280px]  p-10 m-auto  grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))]   mt-14 gap-7 max-md:text-center  '>
        <div className=' min-h-80 rounded-2xl  p-4 flex flex-col justify-center gap-3  '>
            <img className='w-32 h-32 m-auto' src={pig} alt="" />
            <h1 className='text-[22px] font-medium  '>Higher Profits</h1>
            <p className='text-[#485256] text-[16px] leading-6'>We offer some of the lowest prices in the industry because print providers continuously compete to win your business</p>
        </div>
        <div className='  min-h-80 rounded-2xl p-4 flex flex-col justify-center gap-3  '>
          
            <img className='w-32 h-32 m-auto' src={rocket} alt="" />
         
            <h1 className='text-[22px] font-medium '>Robust Scaling</h1>
            <p className='text-[#485256] text-[16px] leading-6'>Easily handle peak holiday seasons, with our wide network of partners and automatic routing functionality.</p>
        </div>
        <div className=' min-h-80 rounded-2xl p-4 flex flex-col justify-center gap-3  '>
          
            <img className='w-32 h-32 m-auto ' src={mobile} alt="" />
         
            <h1 className='text-[22px] font-medium '>Best Selection</h1>
            <p className='text-[#485256] text-[16px] leading-6'>With 900+ products and top quality brands, you can choose the best products for your business.</p>
        </div>
    </div>
  )
}

export default Features