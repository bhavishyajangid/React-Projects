import React from 'react'

const LegendItem  = ({ color, label }) => {
  return (
     <div className="flex items-center gap-2">
    <span
      className={`w-3 h-3 sm:w-4 sm:h-4 sm:rounded-md rounded-sm ${color}`}
    ></span>
    {label}
  </div>
  )
}

export default LegendItem 