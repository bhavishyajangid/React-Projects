import React from 'react';

const CategoryName = ({ item, selectedCategory, handleCategoryChange }) => {
    return (
        <div className="w-full flex  items-center gap-3 cursor-pointer mt-2 px-2">
            <input
                type="checkbox"
                onChange={() => handleCategoryChange(item)} // Handle category change
                checked={selectedCategory === item} // Check if the category is selected
                className="cursor-pointer"
                name="checkbox"
                id={`checkbox-${item}`}
            />
            <label className="text-sm capitalize" htmlFor={`checkbox-${item}`}>
                {item}
            </label>
        </div>
    );
};

export default CategoryName;
