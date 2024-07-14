import { useState } from 'react'
import { useNavigate, NavLink, Link, Outlet } from 'react-router-dom'
import nikeVideo from "./Videos/nike.mp4"

import './App.css'
import Navbar from './components/Navbar/Navbar'

function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
     
      <div className='h-20 w-full bg-[#F4F4F4] p-2 text-center '>
        <p className='font-medium text-[17px] leading-6 '>Move, Shop, Customise & Celebrate With Us.</p>
        <p className='text-sm '>No matter what you feel like doing today, It’s better as a Member</p>

        <span className='text-xs font-semibold underline'>Join Us</span>

      </div>

         <section className='h-[150vh] w-full '>
           <video className='h-screen w-full' src={nikeVideo} autoPlay loop muted></video>

           <h1 className='text-7xl mt-5 font-extrabold text-center capitalize '>WIN ON AIR</h1>
           <p className='font-medium capitalize text-center mt-3'>meet the next generation of nike air engineered to the next specification of championship athelets</p>
           <button className='w-24 h-10 rounded-3xl bg-black text-white font-medium capitalize text-md relative left-[46%] mt-5 hover:bg-[#707072]'>shop air</button>
         </section>
    </>
  )
}

export default App
