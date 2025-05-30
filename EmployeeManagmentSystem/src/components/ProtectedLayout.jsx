import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { AdminDashboardSkeleton, Home } from '../export'

const ProtectedLayout = ({adminOnly = false}) => {
    const {isLogin , currentUserDetails } = useSelector(state => state.authSlice)
    const {loaderForSkeleton } = useSelector(state => state.taskSlice)
    

if(!isLogin)   return <Navigate to={"/login"} replace/>


  if (adminOnly && !currentUserDetails?.admin) {
    return <Navigate to="/employee" replace />;
  }

return <Home/>
}

export default ProtectedLayout