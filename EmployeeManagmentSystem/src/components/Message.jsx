import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import MessageSkeleton from './skeleton/MessageSkeleton'

const Message = ({item}) => {
 const {currentUserDetails} = useSelector(state => state.authSlice)
 const msg = item.senderId == currentUserDetails.userId ? false : true

 
  return (
    <div key={item.$id} class={`flex ${ msg ? "justify-start" : "justify-end" }`}>
         <div className={`max-w-72 px-4 py-2  flex flex-col text-sm   rounded-md ${msg ? "bg-blue-500 text-white" : "text-black bg-gray-300" }`}>
          <span>{item.message}</span>
          <span class="text-xs text-gray-400 ">{item.time}</span>
         </div>
      </div>
  )
}

export default Message