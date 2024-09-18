import React from "react";

const InnerCard = ({ tittle }) => {
  return (
    <div className="w-[199px] h-[95px] rounded-[10px]  overflow-hidden relative shadow-InnerBoxShadow bg-[#0000000D]">
      <p className="text-[12px] font-opensans text-[#000000] p-2">
        {tittle}
      </p>
      <textarea
        className="w-full h-[70px] text-[#6C757D] bg-[#ffffff] rounded-[10px] text-[12px] font-opensans absolute top-7 p-2  outline-none border-none"
        placeholder="Enter Text here"
      ></textarea>
    </div>
  );
};

export default InnerCard;
