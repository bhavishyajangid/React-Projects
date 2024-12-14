import React, { forwardRef } from 'react';

const Input = forwardRef(({ type, className, label, divClass, ...props }, ref) => {
  return (
    <div>
      {label && <label htmlFor={label} className="block text-white text-base mb-1">{label}</label>}
    
      <div className={`h-10 flex items-center bg-white overflow-hidden rounded-lg ${divClass}`}>
        {type === 'tel' && (
          <span className="px-2 py-2 font-medium inline-block bg-gray-400 text-white">+91</span>
        )}

        <input
          ref={ref} // Pass the ref to the input element
          className={`w-full h-full outline-none rounded-md px-2 text-black ${className}`}
          type={type}
          {...props}
          id={label}
        />

        {/* {type === 'email' || type === 'tel' ? (
          <button type="button" className="text-base px-3 font-medium h-full bg-red-300 text-blue-700">
            Verify
          </button>
        ) : null} */}
      </div>
    </div>
  );
});

export default Input;
