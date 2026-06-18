import React from "react";

const Select = React.forwardRef(function (
  {
    label = "",
    className = "",
    id,
    error,
    options = [],
    placeholder = "Select an option",
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
      <select ref={ref} className={className} id={id} {...props}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
