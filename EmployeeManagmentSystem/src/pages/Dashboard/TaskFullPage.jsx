import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import TaskServices from '../../Appwrite/Task'

const TaskFullPage = () => {
  const {currentUserDetails} = useSelector(state => state.authSlice)
  const {TaskId} = useParams()

 const card =  currentUserDetails.tasks.filter((item) => item.$id === TaskId)
 
//  console.log(card);
//  console.log(currentUserDetails)
 
const deleteTask = async() => {
  //  const confirmToDelete =  confirm("you want to delete this task")
  //   if(confirmToDelete){
      try {
        const deletedTask = await TaskServices.deleteTask(card[0].$id)
          if(deleteTask){
            console.log(deletedTask); 
          }
      } catch (error) {
        console.log(error);
        
      }
         
    // }
   
}
 

  
  return (
    <>
     <div className="w-full px-10 mt-16 max-sm:px-3">
      {/* Task Card */}
      <div className="w-3/4 min-h-96 flex flex-col gap-5  p-5 rounded-lg max-sm:w-full">
        {/* Urgent Status */}
        <span
          className={`w-24 py-2 px-7 text-white ${card[0].Urgent ? 'bg-red-500' : 'bg-green-500'} capitalize rounded-lg text-sm font-medium inline-block`}
        >
          {card[0].Urgent ? 'Urgent' : 'Calm'}
        </span>

        {/* Task Date */}
        <span className="text-sm mt-2">{card[0].Date}</span>

        {/* Task Details */}
        <div className="flex flex-col gap-3 capitalize mt-5">
          <h1 className="text-xl font-semibold text-white">{card[0].Tittle}</h1>
          <span className="text-sm text-gray-300">{card[0].Category}</span>
          <span className="text-sm text-gray-300">{card[0].AssignTo}</span>
          <p className="text-sm text-gray-300">{card[0].Description}</p>
        </div>

        {/* Complete Button */}
        <div className='flex gap-8 max-sm:flex-col mt-8'>
        <button className="bg-red-500 w-40 py-2   font-medium rounded-lg capitalize text-white ">
          {card[0].isComplete ? 'Complete' : 'Not Completed'}
        </button>

        <button onClick={() => {deleteTask()}} className=' w-40 h-10 rounded-lg text bg-white font-medium text-gray-900'>Delete Task</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default TaskFullPage