import React from "react";
import rightarrow from "../assets/rightarrow.png";
import leftarrow from "../assets/leftarrow.png";
import square from "../assets/square.png";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
const CardThirdPart = () => {
  return (
    <div className="w-full h-[399px] border border-solid border-[#D1CECE] mt-11 py-5 px-4">
      <div>
        <h2 className="text-[16px] font-semibold font-opensans leading-[21px]">
          Title{" "}
        </h2>
        <input
          className="w-full h-[43px] rounded-[5px] bg-[#FCFBFB] shadow-InputShadow mt-7"
          type="text"
        />
      </div>

      <div className="w-full h-[224px] mt-5 ">
        <h2 className="text-[16px] font-semibold font-opensans text-[#000000]">
          Content
        </h2>
        <div
          className="w-full h-[80px] rounded-t-[5px] bg-[#FCFBFB] shadow-contentShadow mt-4

 "
        >
          <div className="w-full h-1/2 text-[12px] font-poppins text-[#616161] leading-[18px] px-4 items-center flex gap-4 ">
            <span className="cursor-pointer">Home</span>
            <span className="cursor-pointer">Edit</span>
            <span className="cursor-pointer">View</span>
            <span className="cursor-pointer">Insert</span>
            <span className="cursor-pointer">Formate</span>
            <span className="cursor-pointer">Tools</span>
            <span className="cursor-pointer">Table</span>
            <span className="cursor-pointer">Help</span>
          </div>

          <div className="w-full h-1/2 text-[12px] font-poppins text-[#616161] leading-[18px] font-normal px-4 items-center flex gap-4 ">
            <span className="cursor-pointer">
              <img src={leftarrow} alt="" />
            </span>
            <span className="cursor-pointer">
              <img src={rightarrow} alt="" />
            </span>
            <span className="cursor-pointer">
              <img src={square} alt="" />
            </span>
            <input
              className="w-[102px] h-[18px] bg-[#ebebeb] text-[12px] font-poppins text-[#616161] px-1 border-none outline-none"
              type="text"
              placeholder="Paragraph"
            />
            <HiOutlineDotsHorizontal className="text-[24px] cursor-pointer" />
          </div>
        </div>

        <textarea className="w-full h-[142px] bg-[#FCFBFB] shadow-InputShadow border-none outline-none px-2 py-2"></textarea>
      </div>
    </div>
  );
};

export default CardThirdPart;
