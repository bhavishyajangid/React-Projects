import React from 'react'
import { QuantityBtn } from '../export'
import { MdDelete } from "react-icons/md";
const Cart = ({item}) => {
  return (
   <div className='w-full h-20 flex items-center justify-between border-t border-solid border-gray-300 p-5'>
   <div className='w-16 h-16 flex items-center '>
    <img className='w-full h-full' src={item.thumbnail} alt="" />
   </div>
   <h1 className=' '>{item.title}</h1>
   <span>{item.price}</span>
   <QuantityBtn/>
   <span>{item.total}</span>
<button><MdDelete className='text-2xl text-red-500' /></button>
   </div>
  )
}

export default Cart