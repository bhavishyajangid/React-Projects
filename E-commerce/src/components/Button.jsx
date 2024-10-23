import React from 'react'

const Button = ({
    type = 'submit' ,
    bgColor = 'black' ,
    textColor = 'white' , 
    children , 
    className = '' , 
    ...props

}) => {
  return (
    <button className={`w-96 h-10 rounded-md bg-${bgColor} text-${textColor}${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button