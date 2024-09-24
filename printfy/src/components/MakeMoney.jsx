import React from "react";
import tree from "../assets/tree.png";
import logo from "../assets/logom.svg";
import { TiSocialLinkedin } from "react-icons/ti";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";


const MakeMoney = () => {
  return (
    <>
      <div className="w-full   min-h-96  px-32 max-md:px-14 max-sm:px-0    py-5 relative mt-20 max-sm:mt-10">
        <div className="w-11/12 min-h-96 max-w-[1280px]  m-auto rounded-3xl bg-[#203741] flex items-center">
          <div className="h-full w-[450px] px-[70px] max-sm:px-5 max-sm:py-5 py-10  max-xl:w-full ">
            <h1 className="text-5xl font-medium text-white max-sm:text-4xl ">
              Make Money, Risk-Free
            </h1>
            <p className="text-[17px] text-white mt-7 leading-5">
              You pay for fulfillment only when you make a sale
            </p>
            <div className="w-full min-h-60 bg-[#17262B] rounded-2xl mt-12 text-white  font-medium  px-10 py-10 max-sm:px-5 ">
              <div className="w-full h-10  flex justify-between items-center  ">
                <span>You sell a t-shirt </span>
                <span>$ 30</span>
              </div>
              <div className="w-full h-10 mb-7 flex justify-between items-center ">
                <span>You pay for its production</span>
                <span>$ 12</span>
              </div>
              <hr />
              <div className="w-full h-10 mt-5 text-xl text-[#18AE4E] font-bold  flex justify-between items-center  ">
                <span>Your profit</span>
                <span>$ 18</span>
              </div>
            </div>
            <button className="bg-[#18AE4E] px-5 py-2 rounded-md text-white font-medium mt-5">
              Start selling
            </button>
            <p className="text-[#7D8188] leading-5 mt-5">
              100% Free to use · 900+ Products · Largest print network
            </p>
          </div>
          <div className="h-full w-2/5  rounded-2xl  overflow-hidden max-xl:hidden ml-20 ">
            <img className="h-full w-full" src={tree} alt="" />
          </div>
        </div>
      </div>
      <div className="w-full   mt-24">
        <div className="w-11/12 max-w-[1280px] m-auto flex justify-between items-center max-sm:flex-col max-sm:justify-normal max-sm:items-start max-sm:gap-3">
          <img
            className="w-[135px]  cursor-pointer"
            src={logo}
            alt="img"
          />
          <div className=" flex gap-2">
            <button className="w-9 h-9 rounded-full bg-green-500  flex justify-center items-center text-xl text-white">
            <FaFacebookF />
            </button>
            <button className="w-9 h-9 rounded-full bg-green-500  flex justify-center items-center text-xl text-white">
            <AiOutlineInstagram />
            </button>
            <button className="w-9 h-9 rounded-full bg-green-500  flex justify-center items-center text-3xl text-white">
              <TiSocialLinkedin />
            </button>
            <button className="w-9 h-9 rounded-full bg-green-500  flex justify-center items-center text-xl text-white">
            <FaXTwitter />
            </button>
            <button className="w-9 h-9 rounded-full bg-green-500  flex justify-center items-center text-xl text-white">
            <FaYoutube />
            </button>
            <button className="w-9 h-9 rounded-full bg-green-500  flex justify-center items-center text-xl text-white">
            <FaTiktok />
            </button>
            <button className="w-9 h-9 rounded-full bg-green-500  flex justify-center items-center text-xl text-white">
            <FaDiscord />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MakeMoney;
