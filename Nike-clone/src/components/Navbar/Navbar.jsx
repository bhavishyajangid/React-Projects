import React from 'react'
import logo from "../../Images/Nike.png"
import searchLogo from "../../Images/search.png"
import heart from "../../Images/heart.png"
import bag from "../../Images/bag.png"
import menu from "../../Images/menu.png"
import profile from "../../Images/profile.png"
import { NavLink } from 'react-router-dom'



const Navbar = () => {
  return (
   <>
    <header className='w-full h-9 bg-[#F4F4F4]  items-center justify-between px-14 hidden md:flex py-2'>
        <img className='h-6 w-6' src="https://upload.wikimedia.org/wikipedia/en/3/37/Jumpman_logo.svg" alt="logo" />
        <div>
          <ul className='flex gap-5  text-xs font-bold items-center cursor-pointer '>
            <li className='hover:text-[#BCAFA5]'> Find a Store </li>
            <li className='hover:text-[#BCAFA5]'>Help </li>
            <li className='hover:text-[#BCAFA5]'>Join Us </li>
            <li className='hover:text-[#BCAFA5]'>Sign In</li>
          </ul>
        </div>
      </header>
   <nav className='h-16 w-full bg-white md:px-12 px-5 flex justify-between'>
        <img className='h-16 w-20 ' src={logo} alt="" />
        <div className=' w-4/6 max-[960px]:hidden lg:pr-10'>
          <ul className='flex h-full w-full  justify-end  items-center gap-6  text-[17px] font-medium capitalize cursor-pointer'>
            <li>
              <NavLink to="/features" className={({isActive})=>
              `${isActive ? "text-orange-600" : "text-black" }`
              }>
              New & Featured
              </NavLink>
              </li>
            <li>
            <NavLink to="/men" className={({isActive})=>
              `${isActive ? "text-orange-600" : "text-black" }`
              }>
              Men
              </NavLink>
              
              </li>
            <li>
            <NavLink to="/women" className={({isActive})=>
              `${isActive ? "text-orange-600" : "text-black" }`
              }>
              Women
              </NavLink>
              </li>
            <li>
            <NavLink to="/kids" className={({isActive})=>
              `${isActive ? "text-orange-600" : "text-black" }`
              }>
              Kids
              </NavLink>
            </li>
            <li>
            <NavLink to="/sale" className={({isActive})=>
              `${isActive ? "text-orange-600" : "text-black" }`
              }>
              Sale
              </NavLink>
            </li>
            <li>
            <NavLink to="/custmise" className={({isActive})=>
              `${isActive ? "text-orange-600" : "text-black" }`
              }>
              Custmise
              </NavLink>
            </li>
            <li>
            <NavLink to="/other" className={({isActive})=>
              `${isActive ? "text-orange-600" : "text-black" }`
              }>
              SNKRS
              </NavLink>
            </li>
          </ul>
        </div>
 
        <div className='h-full lg:gap-4 gap-2 flex items-center justify-evenly'>
             <div className='h-9 lg:w-40  lg:bg-[#f8f8f8]  rounded-3xl flex items-center overflow-hidden ' id='parent'>
             <span className=' lg:bg-[#f8f8f8] bg-transparent h-full w-9 cursor-pointer flex justify-center items-center rounded-full lg:hover:bg-[#CACACB]'><img className='h-4 w-4'  src={searchLogo} alt="searchLogo"/></span>
              <input className='w-[125px] h-full border-none outline-none px-1 font-medium text-[17px] text-gray-950 bg-[#f8f8f8] hidden lg:block' placeholder='Search'  type="text" id='searchInput' />
             </div>

             <NavLink to="/favorite">
             <button className='h-9 w-9 rounded-full hover:bg-[#dfdfdf]  p-2 max-[960px]:hidden'>
              <img className='' src={heart} alt="logo" />
             </button>
              </NavLink>

             <button className='h-9 w-9 rounded-full  min-[960px]:hidden p-2'>
              <img className='' src={profile} alt="logo" />
             </button>

             <NavLink   to="/bag">
             <button className='h-9 w-9 rounded-full hover:bg-[#dfdfdf]  p-2'>
              <img className='' src={bag} alt="logo" />
             </button>
             </NavLink>

             <button className='h-9 w-9 rounded-full  min-[960px]:hidden p-2'>
              <img className='' src={menu} alt="logo" />
             </button>
             
        </div>
       
   </nav>
   </>
  )
}

export default Navbar