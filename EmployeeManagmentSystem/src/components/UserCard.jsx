import React, { memo } from 'react';
import { AiTwotoneDelete } from "react-icons/ai";
import { TbMessageDots } from "react-icons/tb";
import { useDispatch } from 'react-redux';
import { setChatOpen } from '../Store/chatBoxSlice';
import { UserSkeleton } from '../export';

const UserCard = ({ details, deleteUser, loading }) => {
  const dispatch = useDispatch();

  if (loading) return <UserSkeleton />;

  return (
    <div className="bg-gray-800 hover:bg-gray-700 transition-all duration-300 rounded-xl p-6 shadow-md w-full flex justify-between items-center">
      {/* Left Section */}
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-400">User ID: {details.$id}</span>
        <h2 className="text-xl capitalize font-semibold text-white">{details.userName}</h2>
        <span className="text-sm text-gray-300">{details.email}</span>
        <span className="text-sm text-gray-300">{details.number}</span>
      </div>

      {/* Right Section - Actions */}
      <div className="flex gap-6 text-2xl max-sm:text-xl text-gray-400">
        <TbMessageDots
          onClick={() =>
            dispatch(setChatOpen({ isOpen: true, user: details }))
          }
          className="hover:text-sky-400 transition cursor-pointer"
          title="Message"
        />
        <AiTwotoneDelete
          onClick={() => deleteUser(details.$id)}
          className="hover:text-red-400 transition cursor-pointer"
          title="Delete"
        />
      </div>
    </div>
  );
};

export default memo(UserCard);
