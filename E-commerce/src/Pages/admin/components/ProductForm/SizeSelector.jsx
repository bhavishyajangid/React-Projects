import React from "react";

const SIZES = ["S", "M", "L", "XL", "XXL"];

const SizeSelector = ({ value = [], onChange, error }) => {
  const toggleSize = (size) => {
    if (value.includes(size)) {
      onChange(value.filter((s) => s !== size));
    } else {
      onChange([...value, size]);
    }
  };

  return (
    <div>
      <div className="flex gap-2 items-center mb-3">
        <label className="text-sm font-medium text-[#414753] capitalize">Product Sizes</label>
        {error && <p className="text-red-600 text-xs font-medium">{error}</p>}
      </div>
      <div className="flex flex-wrap gap-2.5">
        {SIZES.map((size) => {
          const isSelected = value.includes(size);
          return (
            <button
              key={size}
              type="button"
              onClick={() => toggleSize(size)}
              className={`w-12 h-10 flex items-center justify-center text-sm font-medium border rounded transition-all duration-150 select-none ${
                isSelected
                  ? "bg-[#ffebf0] text-[#ff4e70] border-[#ff4e70] shadow-sm font-semibold scale-105"
                  : "bg-[#f5f5f5] text-gray-700 border-transparent hover:bg-gray-200 active:scale-95"
              }`}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SizeSelector;
