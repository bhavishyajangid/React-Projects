import { useId } from "react"
import React  from 'react'

const Input = React.forwardRef(function Input({
    type = 'text',
    label , 
    className = '' ,
    placeholder = 'username' ,
    ...props
} , ref){
    const id = useId  
    return (
         <div className='w-full'>
            {label && 
            <label
            className='inline-block mb-1 pl-1'
            htmlFor={id} 
            >
                {label}
           </label>}
           {
            <input type={type} 
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            id={id} 
            placeholder={`${label === false ? 'username' : null}`}
            ref={ref}
            {...props} 
             />
           }
         </div>
    )
})

export default Input