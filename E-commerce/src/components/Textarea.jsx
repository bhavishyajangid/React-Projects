import React from "react";

const Textarea = React.forwardRef(function (
  {
    label = "",
    placeholder = "",
    className = "",
    id,
    error,
    rows = 4,
    ...props
  },
  ref,
) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-[#414753] capitalize">
            {label}
          </label>
        )}
        {error && <p className="text-red-600 text-xs font-medium">{error}</p>}
      </div>
      <textarea
        ref={ref}
        className={className}
        placeholder={placeholder}
        id={id}
        rows={rows}
        {...props}
      />
    </div>
  );
});

export default Textarea;
