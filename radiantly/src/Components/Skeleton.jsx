import React from 'react'

const Skeleton = () => {
  return (


    <div className="w-full bg-gray-300 h-screen grid  grid-cols-custom gap-4  p-3">

{
    Array.from({length : 18}).map(() => (
<div class="rounded-xl bg-gray-500 px-5 py-3 cursor-pointer h-60 animate-pulse max-h-60 max-sm:min-w-full max-w-80">
  <div class="h-4 bg-gray-200 w-5 mb-4 rounded-sm"></div>
  <div class="h-32 bg-gray-200 w-40 rounded-lg mb-4 m-auto"></div>
  <div class="h-4 bg-gray-200 w-32 mb-4"></div>
  <div class="flex gap-2">
    <div class="h-4 bg-gray-200 w-10"></div>
    <div class="h-4 bg-gray-200 w-10"></div>
  </div>
</div>
    ))
}
    

    

</div>
  )
}

export default Skeleton