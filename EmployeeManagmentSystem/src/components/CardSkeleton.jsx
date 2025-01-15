import React from 'react'

const CardSkeleton = () => {
  return (
<>


{/* // navbar */}
<nav class="w-full h-20 flex justify-between items-center px-14 mt-5 max-md:px-8 animate-pulse">
  <div className='flex flex-col gap-3'>
     <div className='w-20 h-5 bg-gray-200 '></div> 
     <div className='w-28 h-5 bg-gray-200 '></div> 
  </div>
  <div class="flex gap-5">
    <div class="px-8 py-3 rounded-lg h-6 bg-gray-200"></div>
  </div>
</nav>


{/* // cards  */}
<div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-5 max-md:justify-items-center mt-10 px-10">
{
   Array.from({length : 20}).map((item , index) => (
    <div key={index} class="bg-gray-400 rounded-md  p-5 flex flex-col justify-between gap-3 cursor-pointer animate-pulse h-60 max-md:w-full max-sm:h-60">
  <div class="flex justify-between items-center">
    <div class="h-4 bg-gray-300 rounded w-16"></div>
    <div class="h-4 bg-gray-300 rounded w-16"></div>
  </div>
  <div class="h-6 bg-gray-300 rounded w-1/2"></div>
  <div class="h-4 bg-gray-300 rounded w-full"></div>
  <div class="h-6 bg-gray-300 rounded w-2/3"></div>
  <div class="h-4 bg-gray-300 rounded w-24"></div>

</div>

  ))
}
</div>
</>

  )
}

export default CardSkeleton