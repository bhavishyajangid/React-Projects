import React, { Children } from 'react'

const Button = ({type , className,btn ,onClick = () => {} }) => {
  return (
    <button
    onClick={() => {onClick()}}
    type={type}
    className={`${className}`}
  >
    {btn }
  </button>
  )
}
// w-full h-9 bg-green-500  text-white font-medium rounded-md hover:bg-green-600
export default Button