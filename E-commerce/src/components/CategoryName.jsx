import React from 'react';

const CategoryName = ({ item, index, selectedIndex, handleCategoryChange }) => {
    return (
        <div className="w-full flex items-center gap-3 cursor-pointer mt-2 px-2">
            <input
                type="checkbox"
                onChange={() => handleCategoryChange(item, index)} // Handle category change
                checked={selectedIndex === index} // Only check if the selectedIndex matches this checkbox
                className="cursor-pointer"
                name="checkbox"
                id={`checkbox-${index}`}
            />
            <label className="text-sm capitalize" htmlFor={`checkbox-${index}`}>
                {item}
            </label>
        </div>
    );
};

export default CategoryName;
