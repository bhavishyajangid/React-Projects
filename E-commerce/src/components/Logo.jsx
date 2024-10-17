import React from 'react'
import logo from '../assets/Logo.png'
const Logo = ({
    className = '' ,
    ...props
}) => {
  return (
    <img className={`w-full h-full ${className}`} {...props} src={logo} alt="" />
  )
}

export default Logo