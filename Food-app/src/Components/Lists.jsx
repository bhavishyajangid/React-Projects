import React, { useContext, useState } from "react";
import { AllListContext } from "./Context/AllListContext";

const Lists = ({ item }) => {

  const { filterByCatogries } = useContext(AllListContext)

  const setCatogries = (event) => {
    const span = event.currentTarget.querySelector("span");

    const spanText = span.innerText;

    filterByCatogries(spanText)
  };
  return (
    <div
      onClick={(event) => {
        setCatogries(event);
      }}
      className="w-32 h-full   flex flex-col justify-around items-center cursor-pointer"
    >
      <img className="w-20 h-20 rounded-full" src={item.img} alt="" />
      <span className="text-gray-600 capitalize text-md font-serif ">
        {item.category}
      </span>
    </div>
  );
};

export default Lists;
