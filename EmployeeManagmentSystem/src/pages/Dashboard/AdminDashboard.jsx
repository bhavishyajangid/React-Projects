import React, { memo, useEffect, useState } from 'react'
import TaskServices, { taskService } from '../../Appwrite/Task'
import { AdminTask, Loader } from '../../export';

const AdminDashboard = () => {
  const [allTask ,setAllTask] = useState([])
  // const [loader , setLoader] = useState(true)

  // useEffect(() => {
  //   const fetchAllTask = async() => {
  //       const Task = await TaskServices.getAllTask();
  //       if(Task){
  //         console.log(Task);
  //           setLoader(false)
  //           setAllTask(Task.documents)
  //       }   
  //   }
    
  //     fetchAllTask();

  // } , [])


 
//  if(loader){
//   return <Loader/>
//  }
  return (
    <div>
       <div className='px-14 max-sm:px-5'>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-5 max-md:justify-items-center mt-10">
      {allTask.length === 0 ? (
        <p className="text-sm text-center mt-10">There are no tasks</p>
      ) : (
        allTask.map((item) => (
            <AdminTask item={item} />
        ))
      )}
    </div>
    </div>
    </div>
  )
}

export default memo(AdminDashboard)