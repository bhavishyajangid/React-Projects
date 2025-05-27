import React from 'react'

const UserSkeleton = () => {
  return (
    <div className='w-full px-14 mt-10 flex flex-col gap-5 max-sm:px-5'>
        {
            Array.from({length : 10}).map((item , index) => (

    <div key={index} class='w-full px-5 py-3 bg-gray-300 rounded-md flex justify-between items-center animate-pulse'>
  <div class='flex flex-col'>
    <div class='h-4 bg-gray-500 rounded w-28'></div>
    <div class='h-6 bg-gray-500 rounded w-40 my-2'></div>
    <div class='h-4 bg-gray-500 rounded w-20 my-2'></div>
    <div class='h-4 bg-gray-500 rounded w-20 '></div>
  </div>

  <div class='flex gap-8 text-3xl'>
    <div class='h-10 w-10  bg-gray-500 rounded'></div>
    <div class='h-10 w-10 bg-gray-500 rounded'></div>
  </div>
</div>
            ))
        }
</div>
  )
}

export default UserSkeleton