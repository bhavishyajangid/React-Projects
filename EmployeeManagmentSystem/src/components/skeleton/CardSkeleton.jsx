import React from 'react'

const CardSkeleton = () => {
  return (
<>
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