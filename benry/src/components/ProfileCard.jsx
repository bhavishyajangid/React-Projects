import React from 'react'
import { Link } from 'react-router-dom'

const ProfileCard = ({item}) => {
  return (
    <Link to={`/card/${item.id}`}>
    <div className='w-auto flex gap-5 py-5 px-5 border border-solid border-gray-500 items-center rounded-md  hover:bg-sky-50 cursor-pointer shadow-lg shadow-gray-500'>
               <img className='w-32 h-32 shrink-0 rounded-full bg-center' src={item.image} alt="" />
               <div className='flex flex-col capitalize bg-transparent cursor-pointer hover:bg-sky-50'>
                   <h1 className='text-xl font-medium'>{item.firstName}{item.lastName} <span className='text-sm text-gray-600'>{item.birthDate}</span></h1>
                    <span className='text-gray-900'>{item.company.title}</span>
                    <span className='mt-3 font-medium'>{item.address.country}  <span className='text-sm text-gray-900'>{item.address.state}</span></span>
                    <p className='text-sm text-gray-900 max-w-96'>{item.userAgent}</p>
               </div>
           </div>
           </Link>
  )
}

export default ProfileCard