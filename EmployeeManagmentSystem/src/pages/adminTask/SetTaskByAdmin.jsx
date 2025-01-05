import React from 'react'
import { AdminTask, EmployeeTask, Tasks } from '../../export'
import { IoAddCircleOutline } from "react-icons/io5";
const SetTaskByAdmin = () => {
  return (
    <div className='px-14 max-sm:px-5'>
        <h1 className='text-3xl text-white text-center font-medium mt-5'>Tasks</h1>
        <div className='grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-5 justify-items-center mt-10 '>
         <AdminTask/>
         <AdminTask/>
         <AdminTask/>
         <AdminTask/>
         <AdminTask/>
         <AdminTask/>
         <AdminTask/>
         <AdminTask/>
         <AdminTask/>
         <AdminTask/>
         <AdminTask/>
         <AdminTask/>
         <AdminTask/>
         </div>
    </div>
  )
}

export default SetTaskByAdmin