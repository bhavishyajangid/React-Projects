import React, { useState, useEffect } from "react";
import { Tittle, Card } from "../export";
import { Query } from "appwrite";
import productService from "../appwrite/product";

const ReletedProducts = ({ category, subCategory, currentProductId }) => {
  const [reletedProduct, setReletedProduct] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const queries = [Query.limit(6)];
        
        if (category) {
          queries.push(Query.equal("category", category));
        }
        if (subCategory) {
          queries.push(Query.equal("subCategory", subCategory));
        }

        const response = await productService.getAllProducts(queries);
        if (response && response.documents) {
          const filtered = response.documents
            .filter((item) => item.$id !== currentProductId && item.id !== currentProductId)
            .slice(0, 5);
          setReletedProduct(filtered);
        }
      } catch (error) {
        console.error("Failed to fetch related products", error);
      }
    };
    
    if (category || subCategory) {
      fetchRelated();
    }
  }, [category, subCategory]);

  return (
    <>
      {reletedProduct.length !== 0 ? (
        <div className="w-4/5 max-lg:w-11/12 m-auto mt-14 ">
          <Tittle text1={"RELETED"} text2={"COLLECTION"} />
          <div></div>
          <div className="w-full grid grid-cols-responsive max-sm:grid-cols-2  gap-2 mt-2   ">
            {reletedProduct.map((item) => (
              <Card key={item.$id || item.id} item={item} />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ReletedProducts;
