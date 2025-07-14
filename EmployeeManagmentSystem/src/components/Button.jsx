import React, { Children } from 'react'
import { FaCirclePlus } from "react-icons/fa6";
const Button = ({label = "Add Task"  , type = "submit" , plus = false ,  className="" , ...props}) => {
  return (
     <button type={type} className={`flex items-center  gap-2 bg-primary-500 hover:bg-primary-600 text-white font-medium px-4 py-1.5 rounded-lg shadow-sm transition duration-200 max-sm:text-sm ${className}`} {...props}>
      {
        plus &&  <FaCirclePlus className="text-lg max-sm:text-sm" />
      }
     
      <span>{label}</span>
       </button>
  )
}
export default Button