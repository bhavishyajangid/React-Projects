import React, { Children } from 'react'
import { FaCirclePlus } from "react-icons/fa6";
const Button = ({label = "Add Task"  , type = "submit" , className="" , }) => {
  return (
     <button type={type} className={`flex items-center  gap-2 bg-primary-500 hover:bg-primary-600 text-white font-medium px-4 py-1.5 rounded-lg shadow-sm transition duration-200 max-sm:text-sm ${className}`}>
      {
        type !== "submit" &&  <FaCirclePlus className="text-lg max-sm:text-sm" />
      }
     
      <span>{label}</span>
       </button>
  )
}
// w-full h-9 bg-green-500  text-white font-medium rounded-md hover:bg-green-600
export default Button