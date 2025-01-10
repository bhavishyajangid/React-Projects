import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import TaskServices from '../../Appwrite/Task'
import { toast } from 'react-toastify'
import { deleteTheTask } from '../../Store/authSlice'

const TaskFullPage = () => {
  const {currentUserDetails} = useSelector(state => state.authSlice)
  const {TaskId} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
 const card =  currentUserDetails.tasks.find((item) => item.$id === TaskId)
 console.log(card);
 
 
const deleteTask = async(id) => {
   const confirmToDelete =  confirm("you want to delete this task")
    if(confirmToDelete){
      try {
        const deletingTask = await TaskServices.deleteTask(id)
          if(deletingTask){ 
            dispatch(deleteTheTask(id))
            toast.success("Task deleted successfully")
            navigate("/home")
          }else{
            toast.error("Task not deleted")
          }
      } catch (error) {
        console.log(error);
      }   
    }
   
}
 

  
  return (
    <>
     <div className="w-full px-10 mt-16 max-sm:px-3">
      {/* Task Card */}
      <div className="w-3/4 min-h-96 flex flex-col gap-5  p-5 rounded-lg max-sm:w-full">
        {/* Urgent Status */}
        <span
          className={`w-24 py-2 px-7 text-white ${card.Urgent ? 'bg-red-500' : 'bg-green-500'} capitalize rounded-lg text-sm font-medium inline-block`}
        >
          {card.Urgent ? 'Urgent' : 'Calm'}
        </span>

        {/* Task Date */}
        <span className="text-sm mt-2">{card.Date}</span>

        {/* Task Details */}
        <div className="flex flex-col gap-3 capitalize mt-5">
          <h1 className="text-xl font-semibold text-white">{card.Tittle}</h1>
          <span className="text-sm text-gray-300">{card.Category}</span>
          <span className="text-sm text-gray-300">{card.AssignTo}</span>
          <p className="text-sm text-gray-300">{card.Description}</p>
        </div>

        {/* Complete Button */}
        <div className='flex gap-8 max-sm:flex-col mt-8'>
        <button className="bg-red-500 w-40 py-2   font-medium rounded-lg capitalize text-white ">
          {card.isComplete ? 'Complete' : 'Not Completed'}
        </button>

        <button onClick={() => {deleteTask(card.$id)}} className=' w-40 h-10 rounded-lg text bg-white font-medium text-gray-900'>Delete Task</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default memo(TaskFullPage) 