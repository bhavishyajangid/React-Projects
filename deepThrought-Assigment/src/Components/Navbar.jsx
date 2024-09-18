import React from "react";
import home from "../assets/home.png";
import setting from "../assets/setting.png";
import bell from "../assets/bell.png";
import girlimg from "../assets/girlimg.png";
import reddot from "../assets/reddot.png";
import fulllogo from "../assets/fulllogo.png";
import { PiDotsThreeVerticalBold } from "react-icons/pi";

const Navbar = () => {
  return (
    <nav className="w-full h-[90px] bg-[#F0F0F0] shadow-navbarShadow flex items-center justify-between px-[83px]">
      <div className="w-[311px] h-[49px]   flex items-center">
        <img className="w-full h-full" src={fulllogo} alt="" />
      </div>

      <div className="flex gap-4">
        <span className="cursor-pointer">
          <img src={home} alt="" />
        </span>
        <span className="cursor-pointer">
          <img src={setting} alt="" />
        </span>
        <span className="relative cursor-pointer">
          <img src={bell} alt="" />
          <img className="absolute top-2 right-2" src={reddot} alt="" />
        </span>
        <span className="cursor-pointer">
          <img src={girlimg} alt="" />
        </span>
        <span className="w-[30px] h-[33px] flex justify-center items-center cursor-pointer mt-1">
          <PiDotsThreeVerticalBold className="text-3xl text-[#3683f0]" />
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
