import React from 'react'

const Button = ({type , className, btn ,logout = () => {} }) => {
  return (
    <button
    onClick={() => {logout()}}
    type={type}
    className={`${className}`}
  >
    {btn }
  </button>
  )
}
// w-full h-9 bg-green-500  text-white font-medium rounded-md hover:bg-green-600
export default Button