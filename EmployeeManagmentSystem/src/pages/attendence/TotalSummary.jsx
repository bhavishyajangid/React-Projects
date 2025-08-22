import React from 'react'

const TotalSummary = ({ totals }) => {
  return (
    <div className="mt-6 border-t border-gray-200 pt-4">
      <h3 className="font-semibold text-gray-700 mb-2">Summary</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm sm:text-base">
        <div><span className='text-gray-600 font-medium'> 🌗 Half Day:  </span>{totals.halfDay}</div>
        <div><span className='text-gray-600 font-medium'>⏱️ Overtime:  </span> {totals.overtime}</div>

        {/* Highlight Forget To Mark */}
        <div>
         <span className='text-gray-600 font-medium'>⚠️ Forget To Mark: </span>  {totals.forgetToMark}
        </div>

        <div><span className='text-gray-600 font-medium'>🏖️ Total Leave: </span>{totals.totalLeave}</div>
        <div><span className='text-gray-600 font-medium'>✅ Total Attendance: </span> {totals.totalAttendance}</div>
      </div>
    </div>
  )
}

export default TotalSummary