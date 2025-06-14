import { forwardRef } from 'react';

const Input = forwardRef(({ type, className, label, divClass, ...props }, ref) => {
  return (
    <div>
      {label && <label htmlFor={label} className="block  text-sm mb-1">{label}</label>}
    
    <div className="w-full flex items-center bg-white rounded-lg border border-gray-300">
   
   {
     type == "tel" &&  <span className="pl-2 py-2 text-sm font-medium inline-block text-gray-500">+91</span>
   }
         

        <input
          ref={ref} // Pass the ref to the input element
           className={`w-full px-3 py-2 text-black h-full text-sm rounded-md outline-none focus:no-underline"} ${className}`}
          type={type}
          {...props}
          id={label}
        />


      </div>
    </div>
  );
});

export default Input;
