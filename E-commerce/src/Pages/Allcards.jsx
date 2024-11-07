import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllProducts } from "../Store/allproduct";
import { Card, Tittle } from "../export";

const Allcards = () => {
  const { allProducts } = useSelector((state) => state.allProducts);

  
  
  // fetch product data from an api
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=0")
      .then((res) => res.json())
      // set this data into store
      .then((res) => dispatch(setAllProducts(res.products)));
  }, []);
  return (
    <div className="w-4/5 max-lg:w-11/12 m-auto mt-14 ">
      <Tittle text1={"LATEST"} text2={"COLLECTION"} />
      <div className="w-full grid grid-cols-responsive max-sm:grid-cols-2  gap-2 mt-2   ">
        {
          // display all the cards
          allProducts?.slice(0, 10).map((item) => (
            <Card key={item.id} item={item} id={item.id} />
          ))
        }
      </div>
    </div>
  );
};

export default Allcards;
