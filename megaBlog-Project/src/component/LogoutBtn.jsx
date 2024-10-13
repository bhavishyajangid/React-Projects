import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'

const LogoutBtn = () => {
    const dispatch  = useDispatch()
    const handleLogoutBtn = () => {
       authService.Logout().then(() => {
           dispatch(Logout())
       })
    }
  return (
    <button onClick={handleLogoutBtn}  className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' >Logout</button>
  )
}

export default LogoutBtn