import React, { useContext } from 'react'
import { LuMessageSquareText } from "react-icons/lu";
import { useDispatch, useSelector } from 'react-redux';
import { setChatOpen } from '../Store/chatBoxSlice';
const MessageIcon = ({info}) => {
    const dispatch = useDispatch()
    const {unseenMessage} = useSelector(state => state.chatBoxSlice)
    const {currentUserDetails} = useSelector(state => state.authSlice)
    
    console.log(unseenMessage , 'unseenmeaagae');
    
  return (
    <div className='w-12 h-12  relative'>
        {
           (unseenMessage.Count  > 0  && unseenMessage.for === currentUserDetails.userName)&& 
        <span className=' px-1.5 py-0.5 absolute bottom-8 right-8   rounded-full text-xs bg-red-500 text-white'>{unseenMessage.Count}</span>
        }
        <button onClick={() => {dispatch(setChatOpen({isOpen : true , user : info}))}} className='text-white text-3xl cursor-pointer hover:text-red-400'><LuMessageSquareText /></button>
    </div>
  )
}

export default MessageIcon