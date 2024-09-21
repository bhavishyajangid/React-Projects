import React from 'react'
import { IoMdMenu } from "react-icons/io";
import logo from '../assets/logom.svg'
import handLogo from '../assets/hand.png'
const Navbar = () => {
  return (
    <nav>
        <div className='w-full h-[70px] px-16 bg-[#ffffff] border border-solid border-gray-200 flex justify-between max-sm:px-8'>
    <div className='h-full  relative overflow-hidden flex bg-red p-2 items-center '>
        <span className='text-3xl text-[#39b75d] mr-4 lg:hidden '><IoMdMenu/></span>
        <img className='sm:hidden' src={handLogo} alt="" />
        <img className='w-[135px]  max-sm:hidden cursor-pointer' src={logo} alt="" />
    </div>

    <ul className='flex items-center text-[16px] text-[#353a47]  gap-8 max-lg:hidden '>
        <li className='cursor-pointer hover:text-[#39b75d] transition-colors duration-150 text-[#353a47]'>Catalog</li>
        <li className='cursor-pointer hover:text-[#39b75d] transition-colors duration-150'>How it works</li>
        <li className='cursor-pointer hover:text-[#39b75d] transition-colors duration-150'>Pricing</li>
        <li className='cursor-pointer hover:text-[#39b75d] transition-colors duration-150'>Blog</li>
        <li className='cursor-pointer hover:text-[#39b75d] transition-colors duration-150'>Services</li>
        <li className='cursor-pointer hover:text-[#39b75d] transition-colors duration-150'>Use-cases</li>
        <li className='cursor-pointer hover:text-[#39b75d]  transition-colors duration-150'>Need help?</li>
    </ul>

    <div className='flex items-center'>
        <button className='w-[88px] h-[36px] border border-solid border-[#c2c2c2] text-[#353a47] bg-[#fff] rounded-[3px] font-medium text-[16px] px-[16px] leading-[24px] outline-none text-center mr-[16px]'>Log in</button>
        <button className='w-[88px] h-[36px]  text-[#fff] text-center bg-[#39b75d]  rounded-[3px] font-medium text-[16px] px-[16px]leading-[24px] outline-none'>Sign up</button>
    </div>
        </div>
    </nav>
  )
}

export default Navbar