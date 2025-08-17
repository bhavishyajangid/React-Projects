import React from 'react'
import authServices from '../../Appwrite/Auth'
import { useDispatch } from 'react-redux'
import { logout } from '../../Store/authSlice'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
const Setting = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
    const logoutUser = authServices.logout()
    if(logoutUser){
      dispatch(logout())
      navigate("/login")
       toast.success("Logout sucessfully")
    }else{
      toast.error("Error while logout")
    }
   
  }
  return (
    <div className='w-full h-full p-5'>
    <button 
        onClick={() => {handleLogout()}} 
        className=" text-sm font-medium md:block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow">
            Logout
        </button>
    </div>
 
  )
}

export default Setting