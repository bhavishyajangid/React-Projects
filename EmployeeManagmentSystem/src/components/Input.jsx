import React, { forwardRef } from 'react';

const Input = forwardRef(({ type, className, label, divClass, ...props }, ref) => {
  return (
    <div>
      {label && <label htmlFor={label} className="block text-white text-sm mb-1">{label}</label>}
    
      <div className={`h-9 flex items-center   rounded-lg ${divClass}`}>
        {type === 'tel' && (
          <span className="px-2 py-2 text-sm font-medium inline-block bg-gray-400 text-white">+91</span>
        )}

        <input
          ref={ref} // Pass the ref to the input element
          className={`w-full h-full outline-none rounded-md px-2 text-sm text-black ${className}`}
          type={type}
          {...props}
          id={label}
        />


      </div>
    </div>
  );
});

export default Input;
