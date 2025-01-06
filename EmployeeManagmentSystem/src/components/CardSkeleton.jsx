import React from 'react'

const CardSkeleton = () => {
  return (
    <div class='w-96 bg-pink-200 rounded-md p-5 flex flex-col justify-around gap-3 cursor-pointer animate-pulse'>

            <div class='flex justify-between items-center'>
               <div class='bg-gray-200 text-gray-200 px-3 py-2 text-sm font-medium rounded-md border-none h-4 w-20'></div>
               <div class='text-black font-medium h-4 bg-gray-200 w-20'></div>
            </div>
          <div class='text-black capitalize font-medium bg-gray-200 h-4 w-3/4'></div>

          <div class='text-gray-900 text-sm bg-gray-200 h-10'></div>
           
           <div class='text-black font-medium h-4 bg-gray-200 w-1/2'></div>
           <div class='px-3 w-fit py-2 text-gray-200 font-medium rounded-md border-none text-sm bg-gray-200 h-4'></div>
         </div>
  )
}

export default CardSkeleton