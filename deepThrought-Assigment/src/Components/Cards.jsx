import React from "react";
import info from "../assets/info.png";

const Cards = ({ comp: Comp, item }) => {
  return (
    <div className="w-[480px] h-[580px]  rounded-[15px] overflow-hidden bg-[#FDFDFD] shadow-CardsShadow">
      <div className="w-full h-[50px] bg-[#000000] flex items-center justify-center relative">
        <h2 className="text-[16px] leading-[22px] text-[#FFFFFF] font-opensans font-semibold text-center">
          {item.asset_title}
        </h2>
        <span className="absolute right-6">
          <img src={info} alt="img" />
        </span>
      </div>

      <div className="w-full h-[86px] py-5 px-4 text-[#000000]">
        <p className="text-[14px] font-opensans leading-[19px] text-left">
          <span className="text-[15px] font-poppins font-semibold">
            Description: 
          </span>
           { item.asset_description}
        </p>
      </div>

      <Comp />
    </div>
  );
};

export default Cards;
