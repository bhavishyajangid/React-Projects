import React, { forwardRef } from 'react'

const Input = forwardRef(({type , className , label , ...props} , ref) => {
    return (
        <>
        <div>

       
        {
            label && <label htmlFor={label} className="block  text-white text-base">{label}</label>
        }
        
       <input ref={ref} className={`w-full h-10 border border-gray-300 rounded-md mt-1 px-2 text-black ${className} `} type={type} {...props}  id={label} />
       </div>
       </>
      )
}) 


export default Input