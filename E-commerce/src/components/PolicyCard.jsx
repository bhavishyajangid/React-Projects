import React from "react";
import { FiBox } from "react-icons/fi";
const PolicyCard = ({ icon = <FiBox />, text1, text2, className }) => {
  return (
    <div
      className={`px-10  py-10  flex flex-col items-center justify-center ${className}`}
    >
      <span className="text-4xl">{icon}</span>
      <h1 className="text-[15px] font-semibold text-gray-800 mt-2">{text1}</h1>
      <p className="text-[15px] font-medium text-gray-400 text-center">
        {text2}
      </p>
    </div>
  );
};

export default PolicyCard;
