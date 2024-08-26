import React from 'react'
import { GoArrowUpRight } from "react-icons/go";
import { DataContext } from '../Context/DataContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {

    const {setCurrencyInfo} = useContext(DataContext)

  return (
    <nav className='w-full h-16 flex justify-between items-center  text-white px-24 max-lg:px-6'>
        <div className='w-1/4  max-md:w-1/2 h-full flex items-center'>
      <Link to="/">
            <h1 className='text-[1.5rem] max-lg:text-[1.2rem] capitalize '>Crypto Place</h1>
            </Link>
        </div>
        <div className='max-lg:hidden'>
            <ul className='flex w-1/2 h-full text-[1.1rem] cursor-pointer gap-6 font-light '>
          <Link to={"/"}>
                <li>Home</li>
         </Link>
                <li>Features</li>
                <li>Pricing</li>
                <li>Blog</li>
            </ul>
        </div>
        <div className='h-full flex items-center gap-7 max-lg:gap-4'>
            <select name="" id="" className='py-1 px-2 max-md:py-[2px] max-md:px-1  border border-white border-solid bg-transparent text-white outline-none rounded-md' onChange={(event) =>{setCurrencyInfo(event.target.value)}} >
                <option className='bg-transparent text-black'  value="usd" >usd</option>
                <option className='bg-transparent text-black' value="inr">inr</option>
                
            </select>
            <button className='w-24 h-9 max-md:w-20 max-md:h-8 flex justify-evenly items-center rounded-3xl px-2 text-sm bg-white text-black'>Sign Up <span><GoArrowUpRight className='text-black text-xs'/></span></button>
        </div>
    </nav>
  )
}

export default Navbar