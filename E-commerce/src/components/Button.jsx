import React from 'react'

const Button = ({
    type = 'submit' ,
    children , 
    className = '' , 
    ...props

}) => {
  return (
   <button
  type={type}
  className={className}
  {...props}
>
  {children}
</button>
  )
}

export default Button