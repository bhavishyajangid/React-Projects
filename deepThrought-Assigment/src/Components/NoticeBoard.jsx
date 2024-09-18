import React from "react";
import { RxCross1 } from "react-icons/rx";
const NoticeBoard = () => {
  return (
    <aside>
      <div className="w-[94px] h-[394px] rounded-tl-[30px] rounded-bl-[30px] absolute top-6 right-0 bg-[#ffffff] shadow-NoticeBoard overflow-hidden">
        <div className="w-[50px] h-full bg-[#000000] flex  items-center flex-col">
          <span>
            <RxCross1 className="text-[#ffffff] text-[24px] mt-6 cursor-pointer" />
          </span>

          <p id="para">Notice Board</p>
        </div>
      </div>
    </aside>
  );
};

export default NoticeBoard;
