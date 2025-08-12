import React from 'react'

const AttendenceSkeleton = () => {
  return (
    <>
   <div className="sm:p-8 py-2 mx-auto rounded-3xl animate-pulse">
      {/* Header */}
      <div className="flex sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <div className="h-6 sm:h-8 bg-gray-300 rounded w-40"></div>
      </div>

      {/* Month Card */}
      <div className="bg-gradient-to-br from-red-100 to-white p-3 sm:p-6 rounded-2xl border border-red-100 shadow-md">
        {/* Month title + select */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-3">
          <div className="h-5 sm:h-6 bg-gray-200 rounded w-24"></div>
          <div className="h-7 sm:h-8 bg-gray-200 rounded-full w-28"></div>
        </div>

        {/* Days grid */}
        <div className="flex gap-3 flex-wrap mt-10">
          {Array.from({ length: 30 }).map((_, index) => (
            <div
              key={index}
              className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-gray-200"
            ></div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-6 mt-6 text-sm sm:text-base border-t border-gray-200 pt-4">
          {[1, 2, 3].map((item) => (
            <div className="flex items-center gap-2" key={item}>
              <span className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm bg-gray-200"></span>
              <span className="h-4 bg-gray-200 rounded w-16"></span>
            </div>
          ))}
        </div>
      </div>
    </div>
</>
  )
}

export default AttendenceSkeleton