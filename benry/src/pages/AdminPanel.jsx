import React, { useState } from 'react'
import { IoIosAddCircle } from "react-icons/io";
import AdminPanelCard from '../components/AdminPanelCard'
import { useDispatch, useSelector } from 'react-redux'
import { setAllProfile, setLoader } from '../store/profileList';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
const AdminPanel = () => {
    const { allProfile } = useSelector((state) => state.profileList);
    const [loader , setLoader] = useState(false)
    const dispatch = useDispatch()
    
    // delete user make manully because this api does not delete the user from the server 
    const deleteUser = async(id) => {
      const data =  allProfile.filter((item) => item.id !== id)
      if(data){
        alert('user delete sucessfully')
        dispatch(setAllProfile(data))
      }
        
    }
  return (
  <div className="flex flex-col gap-5 px-5 mt-5">
    <div className='flex justify-end items-center'>
      <Link to="/adduser">
      <button className=' rounded-lg px-5 font-medium flex items-center gap-2 py-2 text-white bg-green-500'> <IoIosAddCircle />Add User</button>
      </Link>
      </div>
    {/* {// display all the cards} */}
        {allProfile && allProfile.length > 0 ? (
            allProfile?.map((item) => (
                <AdminPanelCard key={item.id} item={item} deleteUser={deleteUser}/>
            ))
          ) : (
            <p className="text-xl absolute top-10 left-[45%] text-black">
              User not found
            </p>
          )}
        
    </div>
    
  )
}

export default AdminPanel