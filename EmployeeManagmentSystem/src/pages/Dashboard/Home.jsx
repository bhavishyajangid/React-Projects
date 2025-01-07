import React from 'react'
import { useSelector } from 'react-redux'
import AdminDashboard from './AdminDashboard'
import EmployeeDashboard from './EmployeeDashboard'

const Home = () => {
    const{currentUserDetails} = useSelector(state => state.authSlice)
  return (
    <div>
        {
           currentUserDetails.admin ? <AdminDashboard/> : <EmployeeDashboard/>
        }
    </div>
  )
}

export default Home