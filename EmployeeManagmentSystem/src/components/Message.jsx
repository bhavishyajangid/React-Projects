import React from "react";
import { useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import img from '../../public/unseen.png'

const Message = ({ item, deleteMessage, showDate, date, time }) => {
  const { currentUserDetails } = useSelector((state) => state.authSlice);

  const msg =
    item.sender === currentUserDetails?.userName ||
    item.senderId === currentUserDetails?.userId ||
    (currentUserDetails?.admin && item.sender === "admin");

    
    
  if (item && item.message?.trim()) {
    return (
      <>
        {showDate && (
          <span className="text-gray-500 text-xs block mb-1 text-center">
            {date}
          </span>
        )}

        <div className={`flex gap-3 ${msg ? "justify-end" : "justify-start"}`}>
          <div
            className={`max-w-72 px-2 py-1  text-sm rounded-md ${
              msg ? "bg-green-300 text-black" : "text-black bg-gray-300"
            }`}
          >
            <span>{item.message}</span>
            <div className="flex gap-2">
            <span className="text-[10px] text-gray-700">{time}</span>
            {
              item.sender == currentUserDetails.userName && <img className="h-4 w-4" src={`${item.seenByReceiver ? "../../public/seen.png" : "../../public/unseen.png"}`} alt="" />
            }
            
            </div>
          </div>
          {msg && (
            <RiDeleteBin6Line
              onClick={() => deleteMessage(item.$id)}
              className="text-sm cursor-pointer text-black hover:text-red-500 mt-5"
            />
          )}
        </div>
      </>
    );
  } else {
    return <p className="text-black text-md">No message</p>;
  }
};

export default Message;
