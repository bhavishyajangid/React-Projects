import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({
    type =  '' ,
    className = '' ,
    text = 'Admin Panel' ,
    path = '/admin' ,
     ...props
}) => {
  return (
    <Link to={path}>
    <button className={`px-5 py-2 text-xs text-gray-500 border border-solid border-gray-300 hover:bg-gray-100 font-medium hover:text-black rounded-3xl ${className}`} {...props}>{text}</button>
    </Link>
  )
}

export default Button