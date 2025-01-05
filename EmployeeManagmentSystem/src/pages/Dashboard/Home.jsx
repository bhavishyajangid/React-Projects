import React from 'react'
import EmployeeDashboard from './EmployeeDashboard'
import AdminDashboard from './AdminDashboard'
import { useSelector } from 'react-redux'

const Home = () => {
    const {currentUserDetails} = useSelector(state => state.authSlice)
  return (
    <div>
        {
            currentUserDetails.admin ? <AdminDashboard/> : <EmployeeDashboard/>
        }
        
    </div>
  )
}

export default Home