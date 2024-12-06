import Button from '../../components/Button'
import Input from '../../components/Input'
import React from 'react'

const AdminDashboard = () => {
  return (
    <div className='w-11/12 m-auto p-5   bg-[#1C1C1C] rounded-lg'>
        <form className='flex max-sm:flex-col' action="">
            <div className='w-1/2 max-sm:w-full max-sm:pr-0 pr-10 flex flex-col gap-4'>
            <Input label='Task Tittle' className="w-full h-9  border border-gray-500 border-solid rounded-lg text-white px-2 bg-transparent outline-none placeholder:text-sm " type="text" placeholder="Make a UI design" /> 
            <Input label='Date' className="w-full h-9  border border-gray-500 border-solid rounded-lg text-white px-2 bg-transparent outline-none   " type="date"  />
            <Input label='Asign To' className="w-full h-9  border border-gray-500 border-solid rounded-lg text-white px-2 bg-transparent outline-none placeholder:text-sm  " type="text" placeholder="Employee name"/> 
            <Input label='Category' className="w-full h-9  border border-gray-500 border-solid rounded-lg text-white px-2 bg-transparent outline-none placeholder:text-sm" type="text" placeholder="Design , dev , etc" />
            </div>

            <div className='w-1/2 max-sm:w-full max-sm:pl-0 max-sm:mt-3 pl-10 flex flex-col max-sm:gap-5 justify-between '>
            <div>
               <label htmlFor='description' className="block  text-white text-base">Description</label>
               <textarea className='w-full h-48 outline-none bg-transparent border border-solid border-gray-500 rounded-lg p-2 mt-1 overflow-y-scroll scroll-bar' name="" id="description">
               </textarea>
            </div>
               <Button  btn="Submit" />
            </div>
        </form>
    </div>
  )
}

export default AdminDashboard