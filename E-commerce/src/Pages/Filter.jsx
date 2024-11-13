import React, { useState, useEffect } from "react";
import { CategoryName, Loader } from "../export"; // Assuming you have the `CategoryName` component
import { useDispatch, useSelector } from "react-redux";
import { setFilterProducts } from "../Store/allproduct";
import { IoIosArrowDown } from "react-icons/io";

const Filter = ({ category }) => {
  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.allProducts);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filter, setFilter] = useState(true); // Track visibility for mobile
  const [isMobile, setIsMobile] = useState(false); // Track if the device is mobile

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCategoryChange = async (categoryName) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null);
      dispatch(setFilterProducts(allProducts)); // Reset filter
    } else {
      setSelectedCategory(categoryName);
      const res = await fetch(`https://dummyjson.com/products/category/${categoryName}`);
      const data = await res.json();
      dispatch(setFilterProducts(data.products)); // Set filtered products
    }
  };

  return (
    <div className="w-60 mt-12 max-sm:mt-5 max-sm:w-full">
      <h1
        onClick={() => {
          if (isMobile) setFilter(!filter); // Toggle filter visibility on mobile
        }}
        className="text-xl flex items-center gap-1 cursor-pointer"
      >
        FILTERS <IoIosArrowDown className={`text-base ${isMobile ? "block" : "hidden"}`} />
      </h1>

      {/* Display categories or show loader */}
      <div className={`w-full p-2 border border-solid border-gray-300 mt-8 max-sm:mt-4 ${filter || !isMobile ? 'block' : 'hidden'}`}>
        <h2 className="text-sm">CATEGORIES</h2>
        {category.length === 0 ? (
          <Loader /> // Show loader if categories are not yet loaded
        ) : (
          category.map((item, index) => (
            <CategoryName
              key={index}
              item={item}
              selectedCategory={selectedCategory}
              handleCategoryChange={handleCategoryChange}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Filter;
