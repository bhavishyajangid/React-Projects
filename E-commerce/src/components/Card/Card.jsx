import React from 'react'
import { Link } from 'react-router-dom'
const Card = ({item , id}) => {
  
  return (
    <Link to={`/product/${id}`}>
    <div className='max-w-[220px] min-w-[180px] rounded-lg px-2 py-3  '>
        <div className='bg-[#E2E1DF]'>
    <img className='w-full h-60 hover:scale-110 transition ease-in-out duration-75' src={item.images[0]} alt="" />
        </div>
        <div className='leading-5'>
    <p className='text-sm text-gray-700 mt-2'>{item.title}</p>
    <span className='text-sm text-gray-700'>price : ${item.price}</span>
        </div>
   </div>
   </Link>
  )
}

export default Card