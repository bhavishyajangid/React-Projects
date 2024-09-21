import React from "react";
import Cards from "./Cards";

import { memo } from "react";
import { useSelector } from "react-redux";
const AllCards = () => {
  const { searchData } = useSelector((state) => state.mydata);


  return (
    <div className="w-full min-h-screen bg-gray-300  p-3 grid  grid-cols-custom gap-4 ">
      {searchData <= 0 ? (
        <h1 className="text-xl font-medium text-center mt-10">Not Found</h1>
      ) : (
        // display the card
        searchData.map((item) => {
          return <Cards key={item.id} item={item} />;
        })
      )}
    </div>
  );
};

export default memo(AllCards);
