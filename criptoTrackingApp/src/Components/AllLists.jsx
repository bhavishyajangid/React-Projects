import React from "react";
import List from "./List";
import Message from "./Message";
import { DataContext } from "../Context/DataContext";
import { useContext } from "react";

const AllLists = () => {
  const { allData, inputValue, loaderActive } = useContext(DataContext);

  return (
    <div className="w-full  flex justify-center   p-5">
      <div
        className="w-[700px] h-80 bg-[#1d124083] backdrop-blur-3xl rounded-lg  mt-6 overflow-y-auto reletive"
        id="scrollbar"
      >
        <div className="w-full h-9 border-gray-600 border-b  text-sm px-5 max-sm:px-3  flex items-center font-medium capitalize text-white sticky top-0 z-0 bg-[#0F1849] ">
          <div className="w-1/2 flex gap-24 max-sm:gap-12">
            <span>#</span>
            <span>Coins</span>
          </div>
          <div className="w-1/2 flex justify-between max-sm:justify-end max-sm:gap-5">
            <span>Prices</span>
            <span>24H Change</span>
            <span className="max-sm:hidden">Market Cop</span>
          </div>
        </div>
        {/* when the loading active is true the loading is show else not showing */}
        {loaderActive ? (
          <p className="text-white text-lg text-center relative top-10">
            Loading...
          </p>
        ) : null}
        {/* heres we make input search filter  */}
        {inputValue === undefined ? (
          allData.map((item, index) => (
            <List key={item.id} item={item} id={item.id} />
          ))
        ) : allData.filter((item) => item.name.includes(inputValue)) ? (
          allData
            .filter((item) => item.name.includes(inputValue))
            .map((item, index) => <List key={item} item={item} index={index} />)
        ) : (
          <Message />
        )}
      </div>
    </div>
  );
};

export default AllLists;
