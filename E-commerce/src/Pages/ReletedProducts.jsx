import React from "react";
import { Tittle, Card } from "../export";
import { useSelector } from "react-redux";
const ReletedProducts = ({ category }) => {
  const { allProducts } = useSelector((state) => state.allProducts);
  // display only five products which category is releted to it
  const reletedProduct = allProducts
    .filter((item) => item.category == category)
    .slice(0, 5);

  return (
    <>
      {reletedProduct.length !== 0 ? (
        <div className="w-4/5 max-lg:w-11/12 m-auto mt-14 ">
          <Tittle text1={"RELETED"} text2={"COLLECTION"} />
          <div></div>
          <div className="w-full grid grid-cols-responsive max-sm:grid-cols-2  gap-2 mt-2   ">
            {reletedProduct.map((item) => (
              <Card key={item.id} item={item} id={item.id} />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ReletedProducts;
