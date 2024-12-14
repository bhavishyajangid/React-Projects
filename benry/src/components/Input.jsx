import React, { forwardRef } from 'react'

const Input = forwardRef(({label , className , type ,  ...props } , ref) => {

    return (
      <div>
          {
              label &&  <label htmlFor={label} className="block font-medium text-gray-700 mb-2">{label}</label>
  
          }
  
         <input 
         ref={ref}
              type={type} 
              id={label} 
              name={label} 
              className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`} 
              {...props}
          /> 
      </div>
    )
})


export default Input