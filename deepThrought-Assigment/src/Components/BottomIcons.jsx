import React from 'react'
import questionmark from '../assets/questionmark.png'
import meeting from '../assets/metting.png'
import calendar from '../assets/calendar.png'

const BottomIcons = () => {
  return (
    <div className='w-full h-[200px]  flex justify-end items-end '>
        <div className='flex flex-col gap-4 absolute right-5'>
        <span className='w-[85px] h-[85px] rounded-full bg-[#0029f0] flex justify-center items-center'><img src={questionmark} alt="" /></span>
        <span className='w-[85px] h-[85px] rounded-full bg-[#0029f0] flex justify-center items-center'><img src={meeting} alt="" /></span>
        <span className='w-[85px] h-[85px] rounded-full bg-[#0029f0] flex justify-center items-center'><img src={calendar} alt="" /></span>
        </div>
    </div>
  )
}

export default BottomIcons