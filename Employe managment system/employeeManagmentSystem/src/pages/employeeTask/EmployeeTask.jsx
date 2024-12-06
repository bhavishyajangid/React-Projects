import React from 'react'
import { TaskDetails } from '../../export'

const EmployeeTask = () => {
    const bgColor = ['bg-red-400', 'bg-sky-400', 'bg-green-400', 'bg-yellow-400' , "bg-violet-400" , "bg-pink-400"];
  return (
    <div className='w-[92%] m-auto  flex  max-sm:px-3    mt-14 overflow-x-scroll scroll-bar'>
        <div className=' flex gap-5 '>
            {
                bgColor.map((item , index) => (
                    <TaskDetails bgColor={item} key={index}/>
                ))
            }
        </div>
    </div>
  )
}

export default EmployeeTask