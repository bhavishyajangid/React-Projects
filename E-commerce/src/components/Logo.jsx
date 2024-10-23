import React from 'react'
import logo from '../assets/Logo.png'
import { Link } from 'react-router-dom'
const Logo = ({
    className = 'w-full h-full' ,
    ...props
}) => {
  return (
    <Link to='/'>
    <img className={` ${className}`} {...props} src={logo} alt="" />
    </Link>
  )
}

export default Logo