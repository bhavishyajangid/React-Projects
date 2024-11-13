import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllProducts } from "../Store/allproduct";
import { AllCollection, Filter, Loader, Searchbar } from "../export";

const Collection = () => {
  const { searchBar } = useSelector((state) => state.allProducts);
  const { filterProducts } = useSelector((state) => state.allProducts); 
  const [category, setCategory] = useState([]);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    // Fetch products
    const fetchProducts = async () => {
      try {
        const productsRes = await fetch('https://dummyjson.com/products?limit=0');
        const productsData = await productsRes.json();
        dispatch(setAllProducts(productsData.products));
        // setFilter(productsData.products); // Set the fetched products in the local state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    // Fetch categories
    const fetchCategories = async () => {
      try {
        const categoriesRes = await fetch("https://dummyjson.com/products/category-list");
        const categoriesData = await categoriesRes.json();
        setCategory(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    // Fetch both data
    const fetchData = async () => {
      setLoader(true); // Show the loader while fetching
      await Promise.all([fetchProducts(), fetchCategories()]);
      setLoader(false); // Hide loader when both data is received
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      {loader ? (
        <Loader /> // Show loader until data is loaded
      ) : (
        <div className="w-4/5 max-lg:w-11/12 m-auto">
          {searchBar && <Searchbar />}
          <div className="w-full flex gap-10 max-sm:gap-3 max-sm:flex-col">
            <Filter category={category} />
            <AllCollection filterProducts={filterProducts} />
          </div>
        </div>
      )}
    </>
  );
};

export default Collection;
