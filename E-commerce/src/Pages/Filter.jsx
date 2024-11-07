import React, { useState, useEffect } from 'react';
import { CategoryName } from '../export'; // Import the CategoryName component
import { useDispatch } from 'react-redux';
import { setFilterProducts } from '../Store/allproduct';

const Filter = () => {
    const dispatch = useDispatch();
    const [category, setCategory] = useState([]); // Store categories
    const [selectedIndex, setSelectedIndex] = useState(null); // Track the selected checkbox index

    useEffect(() => {
        fetch('https://dummyjson.com/products/category-list')
            .then(res => res.json())
            .then(res => setCategory(res))
            
    }, []);

    // Handle when a checkbox is clicked
    const handleCategoryChange = async (item, index) => {
        
        setSelectedIndex(index); // Set the selected checkbox index

        fetch(`https://dummyjson.com/products/category/${item}`)
        .then(res => res.json())
        .then(res => dispatch(setFilterProducts(res.products)));
    };

    return (
        <div className="w-60 mt-12">
            <h1 className="text-xl">FILTERS</h1>
            <div className="w-full p-2 border border-solid border-gray-300 mt-10">
                <h2 className="text-sm">CATEGORIES</h2>
                {category?.map((item, index) => (
                    <CategoryName
                        key={index}
                        item={item}
                        index={index}
                        selectedIndex={selectedIndex} // Pass the selectedIndex to the CategoryName component
                        handleCategoryChange={handleCategoryChange} // Pass the handleCategoryChange function
                    />
                ))}
            </div>
        </div>
    );
};

export default Filter;
