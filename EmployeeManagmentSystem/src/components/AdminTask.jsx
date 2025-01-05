import React from 'react'

const AdminTask = () => {
  return (
    <div className='  bg-sky-500 rounded-md p-5 flex flex-col gap-3 cursor-pointer '>

            <div className='flex justify-between items-center'>
               <span className='bg-red-500  text-gray-200 px-3 py-2 text-sm font-medium rounded-md border-none'>Urgent</span>
               <span className='text-black font-medium'>20/10/2003</span>
            </div>
          <h1 className='text-black capitalize font-medium '>make a youtube video</h1>

          <p className=' text-gray-900 text-sm '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, commodi. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, obcaecati. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores, quaerat!</p>
           
           <h2 className='text-black font-medium '>Assing To : - Ramesh</h2>
           <span className='bg-red-500 px-3 w-fit py-2 text-gray-200 font-medium rounded-md border-none text-sm '>Not Completed</span>
         </div>
  )
}

export default AdminTask