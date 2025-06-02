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
    <div className="bg-white text-gray-800 rounded-xl shadow-md p-6 w-full flex justify-between items-center transition hover:shadow-lg">
      {/* Left: User Details */}
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-500">User ID: {details.$id}</span>
        <h2 className="text-xl capitalize font-semibold">{details.userName}</h2>
        <span className="text-sm text-gray-600">{details.email}</span>
        <span className="text-sm text-gray-600">{details.number}</span>
      </div>

      {/* Right: Actions */}
      <div className="flex gap-3 flex-wrap text-sm">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md shadow"
          onClick={() => dispatch(setChatOpen({ isOpen: true, user: details }))}
        >
          Message
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md shadow"
          onClick={() => deleteUser(details.$id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default memo(UserCard);
