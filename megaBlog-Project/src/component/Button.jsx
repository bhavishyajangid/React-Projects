import React from 'react'

const Button = ({
    children,
    bgColor = 'bg-cyan-500' ,
    textColor = 'black' ,
    type = 'submit' ,
    className = '' ,
    ...props
}) => {
  return (
    <button className={`${bgColor} ${textColor} ${className}`}  {...props}>{children}</button>
  )
}

export default Button