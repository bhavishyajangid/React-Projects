import React from 'react'
import Logo from '../Logo'

const Footer = () => {
  return (
    <>
    <div className='w-4/5 max-lg:w-11/12 flex justify-between m-auto mt-32 max-sm:mt-16 max-sm:flex-col'>
    <div className='w-1/2 pr-28 py-5 max-md:pr-10 max-sm:w-full max-sm:pr-0 '>
        <Logo className=' max-sm:w-24 max-sm:h-8 w-28 h-10'/>
        <p className='text-gray-500 text-sm mt-4 max-sm:text-[13px]'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
    </div>
    <div className='w-1/2 max-sm:w-full  py-5 flex justify-around max-sm:justify-between  '>
      <div>
        <h1 className='text-lg font-medium max-sm:text-[16px]'>COMPANY</h1>
        <ul className='text-sm mt-4 text-gray-500 leading-6'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
        </ul>
      </div>
      <div >
        <h1 className='text-lg font-medium max-sm:text-[16px]'>GET IN TOUCH</h1>
        <ul className='text-sm mt-4 text-gray-500 leading-6'>
            <li>+1-000-000-0000</li>
            <li>Future@gmail.com</li>
            <li>Instagram</li>
        </ul>
      </div>
    </div>
    </div>
    <div className='w-4/5 max-sm:w-11/12 m-auto h-16 border-t border-solid border-gray-300 flex justify-center items-center text-sm '>
    <p >Copyright 2024@ Future.dev - All Right Reserved.</p>
        </div>
        </>
  )
}

export default Footer