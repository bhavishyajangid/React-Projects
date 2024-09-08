import React from 'react'
import { RxCross2 } from "react-icons/rx";

const Signup = () => {
  return (
    <div className='w-full h-screen absolute top-0 flex justify-center items-center '>
        <ul className='w-80 h-96 rounded-md bg-white p-6 flex flex-col justify-around'>
            <li className='text-xl font-medium  flex justify-between items-center'>
                <span>Sign Up</span>
                <span className='cursor-pointer'><RxCross2 /></span>
            </li>
            <li>
                <input className='w-full h-9 mt-3  outline-none pl-2  border border-solid border-gray-300 rounded-sm text-[13px] ' type="text" placeholder='Your name' />
            </li>
            <li>
                <input className='w-full h-9 mt-2 outline-none pl-2  border border-solid border-gray-300 rounded-sm text-[13px] ' type="text" placeholder='Your Email' />
            </li>
            <li>
                <input className='w-full h-9 mt-2 outline-none pl-2  border border-solid border-gray-300 rounded-sm text-[13px] ' type="text" placeholder='Password' />
            </li>
            <li>
                <button className='w-full h-10 bg-orange-500 text-white capitalize font-medium text-md rounded-md mt-3 '>create account</button>
            </li>

            <li className='flex items-start mt-2'>
                <input className='mt-1' type="checkbox" name="name" id="checkbox" />
                <span className='text-xs text-gray-500 ml-2 '>
                    By continue. i agree to the terms of uses & privacy policy
                </span>
               
            </li>
            <p className='text-sm text-gray-500 mt-2'>Already have an account? <span className='text-orange-500 font-medium cursor-pointer'>Login Here</span></p>
        </ul>
    </div>
  )
}

export default Signup