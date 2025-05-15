import React from 'react'

const ReferallBox = ({item}) => {
  return (
    <div className="">
    <img src={item.icon} alt="icon" className="w-10 h-10 rounded bg-[#1f1f1" />
    <p className="text-sm text-gray-400">{item.text}</p>
  </div>
  )
}

export default ReferallBox