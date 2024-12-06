import React from 'react'

const Navbar = () => {
  return (
      <nav className='w-full h-20 flex justify-between items-center px-14 mt-5 max-md:px-8'>
        <h1 className='text-xl font-medium'>Hello <br /> <span className='text-2xl font-medium'>Bhavishya 👋</span></h1>
        <button className='bg-red-500 px-4 py-2 rounded-lg text-sm font-medium border-none'>Logout</button>
      </nav>
)
}

export default Navbar