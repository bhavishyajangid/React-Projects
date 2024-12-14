import React from 'react'
import { MdDelete } from "react-icons/md";
const AdminPanelCard = ({item , deleteUser}) => {
  return (
    <div className='px-5 py-4 flex justify-between items-center border border-solid border-gray-300 text-gray-900 capitalize  ' >
        <div className='flex items-center gap-20'>
        <img className='w-14 h-14' src={item.image} alt="" />
        <div className='flex flex-col gap-2'>
        <h1>{item.firstName}{item.lastName}</h1>
        <span>{item.company.title}</span>
        <span>{item.address.country}</span>
        <span>{item.phone}</span>
        </div>
        </div>
        <MdDelete className='text-2xl text-red-500 cursor-pointer' 
        onClick={()=> {deleteUser(item.id)}} />
    </div>
  )
}

export default AdminPanelCard