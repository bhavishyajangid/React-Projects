import React, { forwardRef, useState } from 'react';

const SelectOption = forwardRef(({ label, options = [], className = '' , error , ...props}, ref) => {
  return (
   <>
      {label && (
        <label htmlFor={label} className="block text-gray-800 text-sm font-medium mb-1">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={label}
        className={`w-full border border-gray-300 px-3 py-2 text-sm rounded-md outline-none focus:ring-2 focus:ring-blue-400  ${className}`}
        {...props}
      >
        <option value="" >
          Select {label}
        </option>

        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
   </>
  );
});

export default SelectOption;
