import React, { useState } from 'react'
import { TbMenu } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import Sidebar from './Sidebar';
const Navbar = () => {
  const [isOpen , setIsOpen] = useState(false)
  return (
    <>
    
    <nav className='w-full h-20  bg-black px-5 flex justify-between items-center  '>
        <img src="/logo.png" alt="Tangam" className='h-auto w-28' />

        <div className='flex items-center gap-3'>
        <button className="bg-[linear-gradient(to_right,_#66ccffb3,_#09f)] text-white px-5 py-1.5 font-semibold rounded-lg">
  Launch Wallet
</button>
            <button onClick={() => {setIsOpen(prev => !prev)}} className='text-white text-2xl cursor-pointer ransition-transform duration-300'>{ isOpen ? <RxCross2 /> : <TbMenu />}</button>
        </div>
        
    </nav>
    
  <Sidebar isOpen={isOpen}/> 
 
    </>
  )
}

export default Navbar