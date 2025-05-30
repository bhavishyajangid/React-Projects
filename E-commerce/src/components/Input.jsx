import React from 'react'

const Input = React.forwardRef(function({
    label = "" ,
    placeholder = 'Enter your email' ,
    className = '' ,
    type ="text" ,
    ...props
} , ref) {
  return (
   <>
        {
            label && <label id='1'>{label}</label>
        }
        <input ref={ref} className={`${className}`} type={type} placeholder={placeholder} id='1' ${...props} />
        </>
  )
})

export default Input