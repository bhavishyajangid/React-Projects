import React, { memo } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { IoMdAdd } from "react-icons/io";
import { IoIosRemove } from "react-icons/io";
import { increment , decrement } from '../Store/addToCart';

const QunatitysetBtn = ({id , addBtn}) => {
    const dispatch = useDispatch()
    const {Quantity} = useSelector((state) => state.addToCart)
  return (    
  <div
    className={`w-[95px] h-[35px] bg-white rounded-3xl  bottom-2 right-3 flex justify-between items-center px-1 ${addBtn ? 'absolute' : "reletive bg-transparent"} `}
  >
    <button
      onClick={() => {dispatch(decrement(id))}}
      className= {` rounded-full bg-red-500 flex justify-center items-center ${addBtn ? 'w-7 h-7 text-xl' : "w-5 h-5 text-md"} `}
    >
      <IoIosRemove />
    </button>
    <span className="text-lg font-medium">{Quantity[id] || 0}</span>
    <button
      onClick={() => {dispatch(increment(id))}}
      className={`rounded-full bg-green-500 flex justify-center items-center   ${addBtn ? 'w-7 h-7 text-xl' : "w-5 h-5 text-md"}`}
    >
      <IoMdAdd />
    </button>
  </div>

  
  )
}

export default memo(QunatitysetBtn) 