import React from 'react'

const TaskFullPageSkeleton = () => {
  return (
   <div className="w-full min-h-screen bg-[#f9fafb] p-8 rounded-xl shadow-md space-y-6 animate-pulse text-gray-300">
  {/* Header */}
  <div className="flex justify-between items-start">
    <div className="flex gap-4 flex-wrap items-center">
      <div className="w-20 h-6 rounded-full bg-gray-300"></div>
      <div className="w-24 h-6 rounded bg-gray-300"></div>
    </div>
    <div className="w-6 h-6 rounded bg-gray-300"></div>
  </div>

  {/* Date */}
  <div className="w-32 h-4 bg-gray-300 rounded"></div>

  {/* Task Info */}
  <div className="space-y-5">
    {/* Title */}
    <div className="flex gap-2 items-center">
      <div className="w-16 h-4 bg-gray-300 rounded"></div>
      <div className="w-48 h-5 bg-gray-300 rounded"></div>
    </div>

    {/* Category */}
    <div className="flex gap-2 items-center">
      <div className="w-20 h-4 bg-gray-300 rounded"></div>
      <div className="w-32 h-5 bg-gray-300 rounded"></div>
    </div>

    {/* Assigned To */}
    <div className="w-40 h-6 bg-gray-300 rounded-full"></div>

    {/* Rejected By */}
    <div className="w-32 h-5 bg-gray-300 rounded-full"></div>

    {/* Description */}
    <div className="space-y-2">
      <div className="w-24 h-4 bg-gray-300 rounded"></div>
      <div className="w-full h-24 bg-gray-300 rounded-md"></div>
    </div>

    {/* Reason for Rejection */}
    <div className="w-full h-20 bg-gray-300 rounded-md"></div>
  </div>

  {/* Buttons */}
  <div className="flex flex-wrap gap-4 pt-4">
    <div className="w-36 h-10 rounded-lg bg-gray-300"></div>
  </div>

  {/* Chat Box */}
  <div className="pt-8">
    <div className="w-full h-32 bg-gray-300 rounded-lg"></div>
  </div>
</div>


  )
}

export default TaskFullPageSkeleton