import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAllProducts } from "../Store/allproduct";
import { Card, Tittle } from "../export";
import productService from "../appwrite/product";

const Allcards = () => {
  const [loading, setLoading] = useState(true);
  const [bestsellerProducts, setBestsellerProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBestseller = async () => {
      setLoading(true);
      try {
        // Directly fetch best‑selling products with a limit (e.g., 10)
        const response = await productService.getBestsellerProducts(10);

        console.log("Fetched bestseller products:", response);

        setBestsellerProducts(response);
        // Keep Redux store in sync (optional – other features may rely on it)
        dispatch(setAllProducts(response));
      } catch (error) {
        console.error("Error fetching bestseller products:", error);
        setBestsellerProducts([]);
        dispatch(setAllProducts([]));
      } finally {
        setLoading(false);
      }
    };

    fetchBestseller();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="w-4/5 max-lg:w-11/12 m-auto mt-14 ">
        <Tittle text1={"BEST SELLER"} />
        <div className="text-center py-10">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-4/5 max-lg:w-11/12 m-auto mt-14 ">
      <Tittle text1={"BEST SELLER"} />
      <div className="w-full grid grid-cols-responsive max-sm:grid-cols-2  gap-2 mt-2   ">
        {bestsellerProducts.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No bestseller products found. </p>
        )
          : (
            bestsellerProducts.map(item => (
              <Card key={item.id} item={item} />
            ))
          )}
      </div>
    </div>
  );
};

export default Allcards;