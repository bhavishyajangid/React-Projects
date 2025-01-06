import React, { useEffect, useState } from 'react'
import {AdminAddedTask, AdminTask} from '../../export'
import TaskServices, { taskService } from '../../Appwrite/Task'

const AdminDashboard = () => {
  const [allTask ,setAllTask] = useState([])
  const [loader , setLoader] = useState(false)

  useEffect(() => {
    const fetchAllTask = async() => {
      setLoader(true)
        const Task = await TaskServices.getAllTask();
        if(Task){
          console.log(Task);
          setLoader(false)
            setAllTask(Task.documents)
        }
    }
      
    fetchAllTask();
  } , [])

  return (
    <div>
      <AdminAddedTask allTask={allTask} loader={loader}/>
    </div>
  )
}

export default AdminDashboard