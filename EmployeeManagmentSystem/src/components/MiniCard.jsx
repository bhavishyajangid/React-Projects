import React from 'react'

const MiniCard = ({item}) => {

  
  return (
     <div className={`bg-white p-5 rounded-lg shadow-md flex items-center border-l-4 cursor-pointer border-${item.color}`}>
    <div className={`bg-${item.color}  text-white p-3 rounded-full mr-4`}>
      {item.icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{item.label}</p>
      <p className="text-xl font-bold text-gray-800">{item.value}</p>
    </div>
  </div>
  )
}

export default MiniCard