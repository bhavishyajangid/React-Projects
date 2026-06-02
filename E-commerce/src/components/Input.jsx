import React from "react";

const Input = React.forwardRef(function (
  {
    label = "",
    placeholder = "Enter your email",
    className = "",
    type = "text",
    id,
    error,
    ...props
  },
  ref,
) {
  return (
    <>
      <div className="flex gap-2 items-center">
        {label && (
          <label htmlFor={id} className="text-sm capitalize">
            {label}
          </label>
        )}

        {error && <p className="text-red-600 text-xs">{error}</p>}
      </div>
     <input
  ref={ref}
  className={className}
  type={type}
  placeholder={placeholder}
  id={id}
  {...props}
/>
    </>
  );
});

export default Input;
