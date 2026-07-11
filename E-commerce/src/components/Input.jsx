import React from "react";

const Input = React.forwardRef(function (
  {
    label = "",
    placeholder = "Enter your email",
    className = "",
    wrapperClassName = "w-full",
    type = "text",
    id,
    error,
    ...props
  },
  ref,
) {
  return (
    <div className={`flex flex-col gap-2 ${wrapperClassName}`}>
      <div className="flex justify-between items-center">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-[#414753] capitalize">
            {label}
          </label>
        )}

        {error && <p className="text-red-600 text-xs font-medium">{error}</p>}
      </div>
      <input
        ref={ref}
        className={className}
        type={type}
        placeholder={placeholder}
        id={id}
        {...props}
      />
    </div>
  );
});

export default Input;
