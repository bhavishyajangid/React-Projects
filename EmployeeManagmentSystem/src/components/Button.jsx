import React from 'react'

const Button = ({type , className, btn}) => {
  return (
    <button
    type={type}
    className={`w-full h-10 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 ${className}`}
  >
    {btn }
  </button>
  )
}

export default Button