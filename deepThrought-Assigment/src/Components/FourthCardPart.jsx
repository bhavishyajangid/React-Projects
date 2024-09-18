import React from "react";
import arrow from "../assets/arrow.png";

const FourthCardPart = () => {
  return (
    <div className="w-full h-[428px] px-4 relative">
      <div className="mt-5">
        <div className="w-full h-[43px] bg-[#f2f2f2] flex items-center pl-3">
          <img src={arrow} alt="" />
          <span className="text-[16px] font-semibold font-opensans leading-[21px] text-[#000000] ml-5">
            Introduction
          </span>
        </div>

        <div className="w-full h-[100px] px-3 py-5 relative ">
          <p className="text-[14px] font-opensans leading-[19px] ">
            The 4SA Method , How to bring a idea into progress ?
          </p>
          <span className="text-[14px] font-semibold font-opensans text-[#606161] absolute bottom-0 right-2">
            See More
          </span>
        </div>
      </div>

      <div className="mt-5">
        <div className="w-full h-[43px] border border-solid border-[#d9d7d7] flex items-center pl-3">
          <img src={arrow} alt="" />
          <span className="text-[16px] font-semibold font-opensans leading-[21px] text-[#000000] ml-5">
            Thread A
          </span>
        </div>

        <div className="w-full h-[130px] px-3 py-5 relative">
          <p className="text-[14px] font-opensans leading-[19px] ">
            How are you going to develop your stratergy ? Which method are you
            going to use to develop a stratergy ? What if the project is
            lengthy?
          </p>
          <span className="text-[14px] font-semibold font-opensans text-[#606161] absolute bottom-0 right-2">
            See More
          </span>
        </div>
      </div>

      <div className="w-4/5 h-[43px] bg-[#fcfcfc] border border-solid border-[#d9d7d7] pl-5 flex items-center mt-3 ml-[85px]">
        <span className="text-[14px] font-semibold font-opensans text-[#000000]">
          Example 1
        </span>
      </div>
      <p className="text-[14px] mt-3 text-center">
        You have a concept , How will you put into progress?
      </p>
    </div>
  );
};

export default FourthCardPart;
