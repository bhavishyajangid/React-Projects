import React from 'react'
import { Link } from 'react-router'
import { AdminTask, CardSkeleton } from '../../export';
import { useSelector } from 'react-redux';
const EmployeeTask = () => {
  const {tasks , loading} = useSelector(state => state.taskSlice)

  if(loading){
     <CardSkeleton/>
  }
  return (
    <div className='px-14 max-md:px-5'>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-5   mt-10">
          
          
      {
      (tasks && tasks.length) === 0 ? (
        <p className="text-sm text-center mt-10">There are no tasks</p>
      ) : (
       tasks.map((item) => (
          <Link to={`/id/${item.$id}`}>
            <AdminTask item={item} />
           </Link>
        ))
      )}
    </div>
    </div>
  )
}

export default EmployeeTask