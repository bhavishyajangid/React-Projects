import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { AllTask, PastTaskInfo } from '../../export';

const AdminDashboard = () => {
  const {allTask } = useSelector(state => state.taskSlice)
  console.log(allTask ,'task');
  
  return (
    <div>
      <PastTaskInfo/>
      <AllTask tasks={allTask}/>
    </div>
  )
}

export default memo(AdminDashboard)