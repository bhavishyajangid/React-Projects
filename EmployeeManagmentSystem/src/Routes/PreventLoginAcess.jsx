import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, replace, useLocation } from 'react-router'
const PreventLoginAcess = () => {
    const{isLogin , currentUserDetails} = useSelector(state => state.authSlice)
    const location = useLocation()

      let publicPaths = ['/login' , '/signup']

      if(isLogin && publicPaths.includes(location.pathname)){
        return <Navigate to={currentUserDetails?.admin ? "/admin" : '/employee' } replace/>
      }

  return <Outlet/>
}

export default PreventLoginAcess