import React from 'react'
import { AiTwotoneDelete } from "react-icons/ai";
import { TbMessageDots } from "react-icons/tb";
import { ChatBox } from '../export';
import { useDispatch } from 'react-redux';
import { setChatOpen } from '../Store/chatBoxSlice';
const UserCard = ({details}) => {
  const dispatch = useDispatch()
  return (
    <div className='w-full px-5 py-3 max-sm:px-3 bg-sky-300 rounded-md flex justify-between items-center '>
        <div className='flex flex-col'>
     <span className='text-gray-600 font-medium'>{details.$id}</span>
     <h1 className='font-medium text-[#131313] text-lg'>{details.userName}</h1>
     <span className='text-sm text-gray-800 font-medium'>{details.email}</span>
     <span className='text-sm text-gray-800 font-medium'>{details.number}</span>
        </div>

    <div className='flex gap-8 text-3xl max-sm:text-2xl'>
     <TbMessageDots onClick={() => {dispatch(setChatOpen({isOpen : true , user : details}))}} className='cursor-pointer'/>
     <AiTwotoneDelete  className='cursor-pointer'/>
    </div>
  </div>

  )
}

export default UserCard