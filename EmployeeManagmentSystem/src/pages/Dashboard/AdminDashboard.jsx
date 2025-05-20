import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { AllTask } from '../../export';

const AdminDashboard = () => {
  const {allTask } = useSelector(state => state.taskSlice)
  console.log(allTask ,'task');
  
  return (
    <div>
      <AllTask tasks={allTask}/>
    </div>
  )
}

export default memo(AdminDashboard)