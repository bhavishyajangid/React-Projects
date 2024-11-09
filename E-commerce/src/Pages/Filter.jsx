import React, { useState, useEffect } from 'react';
import { CategoryName } from '../export'; // Import the CategoryName component
import { useDispatch, useSelector } from 'react-redux';
import { setFilterProducts } from '../Store/allproduct';
import { IoIosArrowDown } from "react-icons/io";

const Filter = () => {
    const dispatch = useDispatch();
    const { allProducts } = useSelector(state => state.allProducts);
    const [category, setCategory] = useState([]); // Store categories
    const [selectedCategory, setSelectedCategory] = useState(null); // Store the selected category
    const [filter, setFilter] = useState(true); // Track if filter is expanded or not
    const [isMobile, setIsMobile] = useState(false); // Track if the device is mobile

    // Check the window size on mount and whenever it changes
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };

        handleResize(); 
        window.addEventListener('resize', handleResize)

        
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    useEffect(() => {
        fetch('https://dummyjson.com/products/category-list')
            .then(res => res.json())
            .then(res => setCategory(res));
    }, []);

   
    const handleCategoryChange = async (categoryName) => {
        if (selectedCategory === categoryName) {
            // If the clicked category is already selected, uncheck it and reset
            setSelectedCategory(null);
            dispatch(setFilterProducts(allProducts));
        } else {
            // If another category is selected, set it and fetch its products
            setSelectedCategory(categoryName);
            const res = await fetch(`https://dummyjson.com/products/category/${categoryName}`);
            const data = await res.json();
            dispatch(setFilterProducts(data.products));
        }
    };

    return (
        <div className="w-60 mt-12 max-sm:mt-5 max-sm:w-full">
            {/* Toggle Filter visibility on mobile */}
            <h1 
                onClick={() => {
                    if (isMobile) {
                        setFilter(!filter); // Toggle visibility on mobile
                    }
                }} 
                className="text-xl flex items-center gap-1 cursor-pointer">
                FILTERS 
                <IoIosArrowDown className={`text-base ${isMobile ? 'block' : 'hidden'}`} />
            </h1>

            {/* Filter section */}
            <div 
                className={`w-full p-2 border border-solid border-gray-300 mt-8 max-sm:mt-4 ${filter || !isMobile ? 'block' : 'hidden'}`}
            >
                <h2 className="text-sm">CATEGORIES</h2>
                {category?.map((item, index) => (
                    <CategoryName
                        key={index}
                        item={item}
                        selectedCategory={selectedCategory} // Pass selectedCategory to the CategoryName component
                        handleCategoryChange={handleCategoryChange} // Pass handleCategoryChange function
                    />
                ))}
            </div>
        </div>
    );
};

export default Filter;
