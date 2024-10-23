import React, { useRef, useState } from 'react'
import { FaStar } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
const Review = ({
item
}) => {
   
    
   
  return (
    <div className='w-full '>
        <div className='w-full flex flex-col gap-2 '>
           <span className={`w-12 h-7  text-white font-medium flex  justify-evenly items-center  rounded-md text-sm ${item.rating <= 2  ? "bg-red-500" : (item.rating > 2 && item.rating <= 4 ? 'bg-yellow-400' : "bg-green-400" ) }`}>{item.rating} <FaStar/></span>
           <p>{item.comment}</p>
        </div>
        <div className='w-full flex gap-5 items-center justify-between mt-2'>
            <div className='flex gap-5'>
            <span className='text-xs text-gray-400 '>{item.reviewerName}</span>
            <span className='text-xs text-gray-400 '>{item.reviewerEmail}</span>
            </div>
            
        </div>
    </div>
  )
}

export default Review