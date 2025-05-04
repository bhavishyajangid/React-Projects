import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { AllTask } from '../../export';

const AdminDashboard = () => {
  return (
    <div>
      <AllTask/>
    </div>
  )
}

export default memo(AdminDashboard)