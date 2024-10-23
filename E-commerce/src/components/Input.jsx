import React from 'react'

const Input = ({
    label = "" ,
    placeholder = 'Enter your email' ,
    className = '' ,
    ...props
}) => {
  return (
   <>
        {
            label && <label id='1'>{label}</label>
        }
        <input className={`${className}`} type="text" placeholder={placeholder} id='1'  />
        </>
  )
}

export default Input