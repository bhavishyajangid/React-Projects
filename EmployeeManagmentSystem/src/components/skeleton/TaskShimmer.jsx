import React from 'react'

const TaskShimmer = () => {
    return (
        <div>


            <div class="flex-1 px-1 md:p-5 animate-pulse">
                <div class="grid sm:grid-cols-1 md:grid-cols-2  md:grid-rows-2  gap-6  xl:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div class="bg-white p-5 rounded-lg shadow-md flex items-center border-l-4 cursor-pointer border-gray-200">
                            <div class="bg-gray-200 text-white p-3 rounded-full mr-4">
                                <div class="h-4 bg-gray-200 rounded"></div>
                            </div>
                            <div>
                                <div class="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                                <div class="h-4 bg-gray-200 rounded w-1/4"></div>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>


 <div className="px-5 flex flex-col gap-5">
      {/* Heading Skeleton */}
      <div className="flex justify-between items-center">
        <div className="h-6 w-40 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="h-9 w-28 bg-gray-200 rounded-md animate-pulse"></div>
      </div>

      {/* Filter Skeleton (Optional) */}
      <div className="flex gap-3">
        <div className="h-10 w-32 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="h-10 w-20 bg-gray-200 rounded-md animate-pulse"></div>
      </div>

      {/* Grid of Card Skeletons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-xl shadow-md p-4 flex flex-col justify-between min-h-[180px] min-w-[320px] animate-pulse"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
              <div className="h-5 w-20 bg-gray-200 rounded-md"></div>
            </div>

            {/* Title */}
            <div className="h-4 w-2/3 bg-gray-200 rounded-md mb-2"></div>

            {/* Date */}
            <div className="h-3 w-1/3 bg-gray-200 rounded-md mb-3"></div>

            {/* Assigned To */}
            <div className="h-5 w-24 bg-gray-200 rounded-md mb-2"></div>

            {/* Rejected Info */}
            <div className="h-4 w-28 bg-gray-200 rounded-md mb-3"></div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-3">
              <div className="h-7 w-14 bg-gray-200 rounded-md"></div>
              <div className="h-7 w-14 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    </div>

        </div>
    )
}

export default TaskShimmer