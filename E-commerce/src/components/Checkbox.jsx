import React from "react";

const Checkbox = React.forwardRef(function (
  { label = "", className = "", id, error, ...props },
  ref,
) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          type="checkbox"
          className={className}
          id={id}
          {...props}
        />
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-[#414753] capitalize cursor-pointer select-none">
            {label}
          </label>
        )}
      </div>
      {error && <p className="text-red-600 text-xs font-medium">{error}</p>}
    </div>
  );
});

export default Checkbox;
