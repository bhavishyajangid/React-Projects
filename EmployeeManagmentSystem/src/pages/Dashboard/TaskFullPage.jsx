import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router'
import TaskServices from '../../Appwrite/Task'
import { toast } from 'react-toastify'
import { deleteTheTask } from '../../Store/authSlice'
import { ChatBox, Loader } from '../../export'
import { LuMessageSquareText } from "react-icons/lu";
import { FaRegEdit } from "react-icons/fa";
import { setChatOpen } from '../../Store/chatBoxSlice'
import MessageIcon from '../../components/MessageIcon'

const TaskFullPage = () => {
  const {currentUserDetails} = useSelector(state => state.authSlice)
  const [taskDetails , setTaskDetails] = useState(null)
  const {TaskId} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
     TaskServices.getSingleTask(TaskId)
    .then((res) => {
      if(res){  
        setTaskDetails(res)
      }
    })
    .catch((error) => {
      console.log(error);
      
    })
    
  } , [TaskId])
 
 
 
const deleteTask = async(id) => {
   const confirmToDelete =  confirm("do you want to delete this task")
    if(confirmToDelete){
      try {
        const deletingTask = await TaskServices.deleteTask(id)
          if(deletingTask){ 
            dispatch(deleteTheTask(id))
            toast.success("Task deleted successfully")
            navigate("/home")
          }else{
            toast.error("failed to delete task")
          }
      } catch (error) {
        console.log(error);
      }   
    }
   
}
 


if(!taskDetails){
  return <Loader/>
}
  return (
    <>
     <div className="w-full min-h-96 flex flex-col gap-5   rounded-lg max-sm:w-full px-16 py-20 max-sm:px-10">
      {/* Task Card */}
         
         <div className='flex justify-between items-center'>
        <span
          className={`w-24 py-2 px-7 text-white ${taskDetails.Urgent ? 'bg-red-500' : 'bg-green-500'} capitalize rounded-lg text-sm font-medium inline-block`}
        >
          {taskDetails.Urgent ? 'Urgent' : 'Calm'}
        </span>
        <MessageIcon info={taskDetails}/>

        {
           taskDetails.admin && <Link to={`/editTask/${taskDetails.$id}`}>
           <FaRegEdit className='w-11 h-11 p-2 rounded-lg text-white bg-gray-500 ' />
 
         </Link>
        }
        
         </div>

        {/* Task Date */}
        <span className="text-sm mt-2">{taskDetails.Date}</span>

        {/* Task Details */}
        <div className="flex flex-col gap-3 capitalize mt-5">
          <h1 className="text-xl font-semibold text-white">{taskDetails.Tittle}</h1>
          <span className="text-sm text-gray-300">{taskDetails.Category}</span>
          <span className="text-sm text-gray-300">{taskDetails.AssignTo}</span>
          <p className="text-sm text-gray-300">{taskDetails.Description}</p>
        </div>

        {/* Complete Button */}
        <div className='flex gap-8 max-sm:flex-col mt-8'>
        <button className="bg-red-500 w-40 py-2   font-medium rounded-lg capitalize text-white ">
          {taskDetails.isComplete ? 'Complete' : 'Not Completed'}
        </button>
         
         {
           currentUserDetails.admin && <button onClick={() => {deleteTask(taskDetails.$id)}} className=' w-40 h-10 rounded-lg text bg-white font-medium text-gray-900'>Delete Task</button>
         }
        
        </div>
        <ChatBox/>
      </div>
    </>
  )
}

export default memo(TaskFullPage) 