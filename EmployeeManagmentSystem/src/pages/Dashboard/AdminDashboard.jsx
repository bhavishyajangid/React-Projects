import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { AllTask } from '../../export';

const AdminDashboard = () => {
  const {currentUserDetails} = useSelector(state => state.authSlice)
  return (
    <div>
      <AllTask tasks={currentUserDetails.tasks}/>
    </div>
  )
}

export default memo(AdminDashboard)