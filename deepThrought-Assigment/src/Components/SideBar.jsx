import React, { useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import gsap from "gsap";
const SideBar = () => {
  const sidebar = useRef(null);
  const btn = useRef(null);
  const [toggle, setToggle] = useState(false);

  const handleBtn = () => {
    if (toggle) {
      gsap.to(sidebar.current, {
        duration: 0.5,
        x: 0,
      });

      gsap.to(btn.current, {
        rotate: 360,
        duration: 0.5,
      });
    } else {
      gsap.to(sidebar.current, {
        duration: 0.5,
        x: 198,
      });

      gsap.to(btn.current, {
        rotate: 180,
        duration: 0.5,
      });
    }
    setToggle((prev) => !prev);
  };
  return (
    <aside>
      <div
        ref={sidebar}
        className="w-[330px] h-[692px] bg-[#fdfdfd] rounded-custom overflow-hidden flex flex-col items-center absolute top-0 -left-[198px] z-10"
      >
        <div className="w-full h-[50px] bg-[#000000] flex justify-between items-center px-4">
          <span className="font-poppins text-[16px] font-semibold text-[#ffffff] leading-[24px]">
            Journey Board
          </span>
          <span
            onClick={handleBtn}
            ref={btn}
            className="w-[25px] h-[25px] rounded-full bg-white flex justify-center items-center  cursor-pointer"
          >
            <FaArrowRight />
          </span>
        </div>

        <ul
          className={`w-full pl-9 py-7 list-disc ${
            toggle ? "block" : "hidden"
          } `}
        >
          <li className="font-semibold text-[16px] font-poppins ">
            Explore the world of management
          </li>
          <li className="text-[16px] font-poppins leading-[24px] text-[#000000]  mt-3 cursor-pointer">
            Technical Project Management
          </li>
          <li className="text-[16px] font-poppins leading-[24px] text-[#000000] cursor-pointer ">
            Threadbuild
          </li>
          <li className="text-[16px] font-poppins leading-[24px] text-[#000000] cursor-pointer ">
            Structure your pointers
          </li>
          <li className="text-[16px] font-poppins leading-[24px] text-[#000000] cursor-pointer  ">
            4SA Method
          </li>
        </ul>

        <div
          className={`w-full flex justify-end items-center ${
            toggle ? "hidden" : "block"
          }`}
        >
          <span className="w-[68px] h-[68px] rounded-[20px] border border-solid border-[#0029ff] text-[36px] text-[#0029ff] flex justify-center items-center mt-6 cursor-pointer mr-9">
            {" "}
            1
          </span>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
