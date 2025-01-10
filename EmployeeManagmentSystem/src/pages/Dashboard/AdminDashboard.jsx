import React, { memo, useEffect, useState } from 'react'
import TaskServices, { taskService } from '../../Appwrite/Task'
import { AdminTask, CardSkeleton, Loader } from '../../export';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

const AdminDashboard = () => {
  const {currentUserDetails} = useSelector(state => state.authSlice)
  return (
    <div>
       <div className='px-14 max-sm:px-5'>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-5 max-md:justify-items-center mt-10">
      {currentUserDetails.tasks.length === 0 ? (
        <p className="text-sm text-center mt-10">There are no tasks</p>
      ) : (
        currentUserDetails.tasks.map((item) => (
          <Link to={`/id/${item.$id}`}>
            <AdminTask item={item} />
           </Link>
        ))
      )}
    </div>
    </div>
    </div>
  )
}

export default memo(AdminDashboard)