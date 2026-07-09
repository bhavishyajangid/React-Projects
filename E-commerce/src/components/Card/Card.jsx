import React from 'react'
import { Link } from 'react-router-dom'
const Card = ({ item }) => {
  console.log(item.$id)
  return (
    <Link to={`/product/${item.$id}`}>
      <div className='max-w-[220px] min-w-[180px] rounded-lg px-2 py-3  '>
        <div className='bg-[#E2E1DF]'>
          <img className='w-full h-60 hover:scale-110 transition ease-in-out duration-75' src={item.images[0]} alt="" />
        </div>
        <div className="leading-5 mt-2">
          <p className="text-sm text-gray-700">{item.productName}</p>

          <div className="flex items-center gap-2 mt-1">
            {/* Original Price */}
            <span className="text-md font-semibold text-gray-700">
              ${item.sellingPrice}
            </span>

            <span className="text-sm text-gray-500 line-through">
              ${item.productPrice}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Card