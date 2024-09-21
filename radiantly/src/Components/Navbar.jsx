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
      <div className="w-full h-14 bg-gray-700 px-7 flex justify-between items-center">
        <span>
          <IoIosMenu className="text-3xl text-white cursor-pointer" />
        </span>
        <div className="w-60 h-9  bg-red-300 rounded-2xl overflow-hidden flex items-center cursor-pointer">
          <input
            value={inputValue}
            onChange={(e) => {
              handleInput(e.target.value);
            }}
            placeholder="Search Here"
            className="h-full border-none outline-none pl-3 "
            type="text"
          />
          <span className="ml-2 ">
            <IoSearchOutline className="text-2xl text-black " />
          </span>
        </div>
      </div>
    </nav>
  );
};

export default memo(Navbar);
