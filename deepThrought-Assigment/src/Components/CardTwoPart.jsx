import React, { useState } from "react";
import arrow from "../assets/arrow.png";
import downarrow from "../assets/downarrow.png";
import icons from "../assets/icons.png";
import InnerCard from "./InnerCard";
const CardTwoPart = () => {
  const [one , setOne] = useState('Sub thread 1')
  const [two , setTwo] = useState('Sub Interpretation 1')
  return (
    <div className="w-full ">
      <div className="w-full h-[40px] border border-solid border-[#00000066] flex items-center px-4 bg-[#FEFFC033]">
        <img src={arrow} alt="" />
        <span className="text-[20px] font-semibold font-opensans text-[#000000] ml-16">
          Thread A
        </span>
      </div>

      <div className="w-full flex justify-evenly items-center mt-8">
        <InnerCard tittle= {one}/>
        <InnerCard tittle={two}/>
      </div>

      <div className="w-full flex items-center justify-end gap-5 pr-7 mt-7">
        <span>
          <img src={icons} alt="" />
        </span>
        <div className="w-[91px] h-[32px] rounded-[5px] text-[10px] font-semibold font-poppins text-[#000000] bg-[#ffffff] shadow-BtnShadow flex justify-around items-center cursor-pointer">
          <span>Select Proces</span>{" "}
          <img className="w-[11px] h-[6px] " src={downarrow} alt="" />
        </div>

        <div className="w-[91px] h-[32px] rounded-[5px] text-[10px] font-semibold font-poppins text-[#000000] bg-[#ffffff] shadow-BtnShadow flex justify-around items-center cursor-pointer">
          <span>Select Categ</span>{" "}
          <img className="w-[11px] h-[6px] " src={downarrow} alt="" />
        </div>
      </div>

      <button className="w-[97px] h-[36px] bg-[#0029f0] rounded-[10px] pb-2 mt-7 ml-7 ">
        <span className="text-[20px] text-[#ffffff]">+</span>
        <span className="text-[12px] font-medium text-[#ffffff] font-roboto">
          {" "}
          Sub-thread{" "}
        </span>
      </button>

      <div className="w-full px-7 mt-5">
        <div className="w-full h-[108px] rounded-[10px]  shadow-InnerBoxShadow  bg-[#0000000D]  overflow-hidden">
          <span className="text-[12px] font-opensans text-black p-2">
            Summary for Thread A
          </span>
          <textarea
            className="w-full h-[83px] text-[#6C757D] bg-[#ffffff] rounded-[10px] text-[12px] font-opensans p-2   outline-none border-none"
            placeholder="Enter Text Here"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default CardTwoPart;
