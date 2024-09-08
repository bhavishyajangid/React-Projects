import React from "react";
import Box1 from "./Box1";
import Box2 from "./Box2";


const RightContainer = () => {
  return (
    <div className=" w-[42%] 2xl:w-[48%]  h-[640px] 2xl:h-[730px]  flex   max-2xl:ml-14  items-center max-xl:w-full  max-xl:ml-0   max-xl:justify-between max-xl:items-start max-xl:mt-10 xl:flex-col max-lg:flex-col max-lg:items-center max-xl:h-fit  ">
      <Box1 />
      <Box2 />
    </div>
  );
};

export default RightContainer;
