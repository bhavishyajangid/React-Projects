import React from 'react'

const Footer = () => {
  return (
    <div className='w-full h-60 bg-gray-950 mt-5 m-auto flex max-md:flex-col max-md:h-fit'>
     <div className='w-1/2 h-full px-10 py-4 max-md:w-full  '>
     <h1 className="text-orange-600 text-4xl  font-semibold capitalize max-sm:text-2xl">Tomato.</h1>
        <p className='text-sm text-gray-400 mt-4 max-sm:text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptatem quas nostrum excepturi, qui accusamus numquam assumenda delectus modi maiores aspernatur in expedita inventore rerum voluptas perspiciatis ipsam veniam ex.</p>
     </div>

     <div className='w-1/2 h-full px-10 py-4 flex max-md:w-full max-sm:text-sm  '>
       <div className='w-1/2 h-full flex flex-col text-white  gap-3'>
        <h2 className='text-white text-2xl max-sm:text-xl '>Company</h2>
        <a href="">Home</a>
        <a href="">About us</a>
        <a href="">Delivery</a>
        <a href="">Privacy Policy</a>
       </div>
     <div className='w-1/2 h-full flex flex-col  gap-3 text-white'>
     <h2 className='text-white text-2xl max-sm:text-xl '>Get In Touch</h2>
     <a href="">9001006042</a><a href="">example@gamil.com</a>
     </div>
     </div>
    </div>
  )
}

export default Footer