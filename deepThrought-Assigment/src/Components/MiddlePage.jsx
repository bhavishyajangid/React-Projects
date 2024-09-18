import React from "react";
import SideBar from "./SideBar";
import AllCards from "./AllCards";
import NoticeBoard from "./NoticeBoard";
import BottomIcons from "./BottomIcons";

const MiddlePage = () => {
  return (
    <div className="w-ful  flex relative  ">
      <SideBar />
      <div className="w-4/5 h-full m-auto pl-14 pr-10 ">
        <div className="w-full mt-[15px] flex justify-between items-center">
          <h1 className="text-[28px] font-bold text-[#0029f0] font-poppins ">
            Technical Project Management
          </h1>
          <button className="w-[121px] h-[36px] text-[12px]  font-medium text-[#ffffff] bg-[#0029ff] border-none outline-none rounded-[10px]  ">
            Submit task
          </button>
        </div>

        <div className="w-full  min-h-[135px] rounded-[5px] bg-[#E9ECEF] p-6 mt-10">
          <h2 className="text-[20px] font-bold leading-[30px] text-left tracking-[0.02em] font-poppins">
            Explore the world of management
          </h2>
          <p className="text-[14px] leading-[21px] tracking-[0.02em] font-poppins text-[#000000] mt-2">
            As a project manager, you play an important reole in leading a
            project through initiation, planning, execution, monitoring,
            controlling and completion. How? Do you want to manage each and
            every step of your life?
          </p>
        </div>
      <AllCards/>
<BottomIcons/>
      </div>
<NoticeBoard/>
    </div>
  );
};

export default MiddlePage;
