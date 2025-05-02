import React from "react";
import Cards from "./Cards";
import { memo } from "react";
import { useSelector } from "react-redux";
import FilterBar from "./FilterBar";
const AllCards = () => {
  const { allData } = useSelector((state) => state.mydata);

  
  return (
    <>
    <div className="w-full min-h-screen  bg-gray-300  p-3">
    <FilterBar />
    <div className=" grid  grid-cols-custom gap-4  ">
      {allData <= 0 ? (
        <h1 className="text-xl font-medium text-center mt-10">Not Result Found</h1>
      ) : (
        // display the card
        allData.map((item , index) => {
          return <Cards key={item.id} item={item} index={index}/>;
        })
      )}
    </div>
    </div>
    </>
  );
};

export default memo(AllCards);
