import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminDashboard from './AdminDashboard'
import EmployeeDashboard from './EmployeeDashboard'
import messageServices from '../../Appwrite/Message'
import { toast } from 'react-toastify'
import { setFetched, setUnseenMessage} from '../../Store/chatBoxSlice'

const Home = () => {
   const dispatch = useDispatch()
    const{currentUserDetails} = useSelector(state => state.authSlice)
    const{fetched} = useSelector(state => state.chatBoxSlice)

    useEffect(() => {
      const fetchUnseenMessage = async() => {
        try {
          const messageValue = await messageServices.unseenMessage ( currentUserDetails.admin ? "admin" :  currentUserDetails.userName)
          console.log(messageValue , messageValue.length , "message");
          
          if (Array.isArray(messageValue)) {
            dispatch(setUnseenMessage(messageValue));
          } else {
            console.error("Unseen message data is not an array", messageValue);
            dispatch(setUnseenMessage([])); // Fallback to empty array
          }
        } catch (error) {
            toast.error("faild to fetch unseen message")
        }
      }

      if(fetched){
        fetchUnseenMessage()
        dispatch(setFetched(false))
      }
    } , [])
    
  return (
    <div>
        {
           currentUserDetails?.admin ? <AdminDashboard/> : <EmployeeDashboard/>
        }
    </div>
  )
}

export default Home