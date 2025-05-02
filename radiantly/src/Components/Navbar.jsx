import React, { useState } from "react";
import { memo } from "react";
import { IoIosMenu } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { searchData } from "../Store/DataSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const handleInput = (value) => {
    setInputValue(value);
    dispatch(searchData(value));
  };

  return (
    <nav>
      <div className="w-full h-14 bg-gray-700 px-7 max-sm:px-5 flex justify-between items-center">
        <span className="text-xl text-orange-500 font-semibold max-sm:text-lg">
           Pokemon
        </span>
        <div className="w-60 max-sm:w-44  h-9 max-sm:h-8   bg-red-300 rounded-2xl overflow-hidden flex items-center cursor-pointer">
          <input
            value={inputValue}
            onChange={(e) => {
              handleInput(e.target.value);
            }}
            placeholder="Search Here"
            className="w-[80%] h-full border-none outline-none pl-3 max-sm:text-sm "
            type="text"
          />
          <span className="ml-2   ">
            <IoSearchOutline className="text-2xl max-sm:text-xl text-black " />
          </span>
        </div>
      </div>
    </nav>
  );
};

export default memo(Navbar);
