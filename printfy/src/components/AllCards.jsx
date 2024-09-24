import React, { useRef } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Card from "./Card";
const allCards = () => {
  const scrollBar = useRef(null)

  const handleRightBtn = () =>{
    scrollBar.current.scrollBy({ left: 450, behavior: "smooth" });
  }
  const handleLeftBtn = () =>{
    scrollBar.current.scrollBy({ left: -450, behavior: "smooth" });
  }
  return (
    <div className="w-full min-h-96 py-32 max-sm:py-16 bg-[#F7F7F7] mt-14   ">
      <div className="w-11/12 max-w-[1280px] min-h-96 m-auto  p-5 ">
        <div className="w-full  min-h-40 flex items-center  max-lg:flex-col ">
          <h1 className="text-[40px] font-bold w-1/3 text-[#464B57]  pr-5  leading-snug max-lg:w-4/5 max-lg:text-3xl max-lg:text-center max-lg:p-0  max-md:w-full max-md:text-2xl text-wrap ">
            Trusted by over 8M sellers around the world
          </h1>
          <p className="ml-24 w-1/3 pr-5 h-fit  text-[#485256]  max-lg:w-4/5 max-lg:mt-5 max-lg:text-center max-lg:pr-0 max-lg:ml-0  max-sm:w-full max-md:text-sm text-wrap">
            Whether you are just getting started or run an enterprise-level
            e-commerce business, we do everything we can to ensure a positive
            merchant experience.
          </p>
        </div>

        <div className="w-full m-auto mt-16 ">
          <div ref={scrollBar} className="flex overflow-x-auto gap-4 scrollbar-hidden ">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
        <div className="w-full h-10 flex justify-between items-center mt-14 ">
          <button onClick={handleLeftBtn}>
            <IoIosArrowBack className="text-2xl text-[#485256]" />
          </button>
          <button onClick={handleRightBtn}>
            <IoIosArrowForward className="text-2xl text-[#485256]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default allCards;
