import React, { useState } from 'react'
import { AddTask, Loader } from '../../export'
import { Navigate, useParams } from 'react-router'
import TaskServices from '../../Appwrite/Task'
import { toast } from 'react-toastify'

const EditTask = () => {
    const [task , setTask] = useState(null)
    const {taskId} = useParams()
    console.log(taskId);
    

    useState(() => {
        try {
             TaskServices.getSingleTask(taskId).then((res) => {
                if(res){
                    setTask(res)
                }
             })
        } catch (error) {
            console.log(error);
           toast.error("task not found")
        }
    } , [taskId])

    if(!task){
        return <Loader/>
    }
  return (
     <AddTask task={task}/>
  )
}

export default EditTask