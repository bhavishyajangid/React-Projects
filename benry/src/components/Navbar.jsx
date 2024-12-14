import React from 'react'
import { VscAccount } from "react-icons/vsc";
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className='w-full h-20 flex justify-between items-center px-10 bg-gray-100'>
      <Link to='/'>
       <h1 className='text-2xl uppercase font-Pacifico font-semibold'>MapMyProfile</h1>
      </Link>
       <Link to="/admin">
       <VscAccount className='text-black text-2xl cursor-pointer' title='Admin panel' />
       </Link>
    </nav>
  )
}

export default Navbar