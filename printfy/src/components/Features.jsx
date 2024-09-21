import React from 'react'
import pig  from '../assets/pig.svg'
import rocket from '../assets/rocket.svg'
import mobile from '../assets/mobile.svg'

const Features = () => {
  return (
    <div className='w-11/12 max-w-[1280px] px-[74px] py-[144px] m-auto  flex justify-between items-center mt-10'>
        <div className='w-[300px]  min-h-80 rounded-2xl bg-green-50 p-4 flex flex-col justify-center gap-3  '>
          <div className='w-full flex justify-center items-center'>
            <img className='w-32 h-32 ' src={pig} alt="" />
          </div>
            <h1 className='text-[22px] font-medium text-left '>Higher Profits</h1>
            <p className='text-[#485256] text-[16px] leading-6'>We offer some of the lowest prices in the industry because print providers continuously compete to win your business</p>
        </div>
        <div className='w-[300px]  min-h-80 rounded-2xl bg-green-50 p-4 flex flex-col justify-center gap-3  '>
          <div className='w-full flex justify-center items-center'>
            <img className='w-32 h-32 ' src={rocket} alt="" />
          </div>
            <h1 className='text-[22px] font-medium text-left '>Robust Scaling</h1>
            <p className='text-[#485256] text-[16px] leading-6'>Easily handle peak holiday seasons, with our wide network of partners and automatic routing functionality.</p>
        </div>
        <div className='w-[300px] min-h-80 rounded-2xl bg-green-50 p-4 flex flex-col justify-center gap-3  '>
          <div className='w-full flex justify-center items-center'>
            <img className='w-32 h-32 ' src={mobile} alt="" />
          </div>
            <h1 className='text-[22px] font-medium text-left '>Best Selection</h1>
            <p className='text-[#485256] text-[16px] leading-6'>With 900+ products and top quality brands, you can choose the best products for your business.</p>
        </div>
    </div>
  )
}

export default Features