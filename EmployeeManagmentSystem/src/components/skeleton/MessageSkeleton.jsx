import React from 'react'

const MessageSkeleton = () => {
  return (
    <>
 <div class="flex justify-end animate-pulse">
    <div class="px-2 py-2 flex flex-col rounded-md bg-gray-500">
    <div class="h-4 w-28 bg-gray-200  rounded mt-1"></div>
    <div class="h-2 w-10 bg-gray-200 rounded mt-1 mb-1 "></div>
  </div>
</div>

<div class="flex justify-start animate-pulse">
    <div class="px-2 py-2 flex flex-col rounded-md bg-blue-500">
    <div class="h-4 w-28 bg-gray-200  rounded mt-1"></div>
    <div class="h-2 w-10 bg-gray-200 rounded mt-1 mb-1 "></div>
  </div>
</div>

<div class="flex justify-end animate-pulse">
    <div class="px-2 py-2 flex flex-col rounded-md bg-gray-500">
    <div class="h-4 w-20 bg-gray-200  rounded mt-1"></div>
    <div class="h-2 w-10 bg-gray-200 rounded mt-1 mb-1 "></div>
  </div>
</div>

<div class="flex justify-end animate-pulse">
    <div class="px-2 py-2 flex flex-col rounded-md bg-gray-500">
    <div class="h-4 w-20 bg-gray-200  rounded mt-1"></div>
    <div class="h-2 w-10 bg-gray-200 rounded mt-1 mb-1 "></div>
  </div>
</div>

<div class="flex justify-start animate-pulse">
    <div class="px-2 py-2 flex flex-col rounded-md bg-blue-500">
    <div class="h-4 w-24 bg-gray-200  rounded mt-1"></div>
    <div class="h-2 w-10 bg-gray-200 rounded mt-1 mb-1 "></div>
  </div>
</div>
    </>
  )
}

export default MessageSkeleton