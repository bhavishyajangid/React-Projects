import React, { forwardRef } from 'react';

const Input = forwardRef(({ type, className, label, divClass, ...props }, ref) => {
  return (
    <div>
      {label && <label htmlFor={label} className="block text-gray-800 text-sm mb-1">{label}</label>}
    
      <div className={`h-9 flex  border bg-white border-gray-300 items-center   rounded-lg ${divClass}`}>
        {type === 'tel' && (
          <span className="px-2  text-sm font-medium inline-block  text-gray-400">+91</span>
        )}

        <input
          ref={ref} // Pass the ref to the input element
           className={`w-full px-3 text-black h-full text-sm rounded-md outline-none   ${type === 'tel' ? 'px-0 outline-none' : "focus:ring-2 focus:ring-blue-400"} ${className}`}
          type={type}
          maxLength={type == 'tel' && 10}
          {...props}
          id={label}
        />


      </div>
    </div>
  );
});

export default Input;
