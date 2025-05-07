import React, { useState } from 'react';
const PlusBtn = ({isOpen}) => {

  return (
    <div className="flex justify-center items-center px-5">
        {/* Horizontal bar */}
        <div className="absolute w-[18px] h-[2px] bg-[#E0E4CC] transition-all duration-[250ms] ease-[cubic-bezier(0.17,0.67,0.09,0.97)]" />

        {/* Vertical bar */}
        <div
          className={`absolute w-[2px] h-[18px] bg-[#E0E4CC] transition-all duration-[250ms] ease-[cubic-bezier(0.17,0.67,0.09,0.97)] ${
            isOpen ? 'opacity-0 rotate-90' : 'opacity-100'
          }`}
        />
    </div>
  );
};

export default PlusBtn;
