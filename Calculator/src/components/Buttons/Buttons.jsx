import React from "react";
import { useState } from "react";

const Buttons = ({ btnClick}) => {
    const [allitem, setAllItem] = useState([
        "Ac",
        "C",
        "%",
        "÷",
        "7",
        "8",
        "9",
        "x",
        "4",
        "5",
        "6",
        "-",
        "1",
        "2",
        "3",
        "+",
        "0",
        "H",
        ".",
        "=",
      ]);
  return (
    <>
     <div className="h-fit w-full flex flex-wrap  items-center  justify-center mt-3">
     {allitem.map((item, index) => (
      <button
      key={index}
      onClick={() => btnClick(item)}
     className="h-14 w-14 rounded-full bg-gray-500 text-white font-medium text-2xl m-1 ">
        {item}
      </button>
            
          ))}
      </div>
    </>
  );
};

export default Buttons;
