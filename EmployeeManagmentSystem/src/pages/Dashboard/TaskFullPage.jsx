import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { taskAllDetails, updateTheTaskInfo, deleteTaskThunk, handleUserTaskAction } from '../../Store/thunks/taskThunk';
import { showError, showSuccess } from '../../utlity/Error&Sucess';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import MessageIcon from '../../components/MessageIcon';
import Loader from '../../components/Loader';
import ChatBox from '../admin/ChatBox';
import { Button, Input } from '../../export';
import { useForm } from 'react-hook-form';

const TaskFullPage = () => {
  const { currentUserDetails } = useSelector((state) => state.authSlice);
  const { loading , error } = useSelector(state => state.taskSlice);
  const [singleTask , setSingleTask] = useState()
  const {register , handleSubmit} = useForm()
  const [reject , setReject] = useState(false)
  const { TaskId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSingleTask = async() => {
      try {
        const res =  await dispatch(taskAllDetails(TaskId)).unwrap()
        if(res){
          setSingleTask(res)
        }
      } catch (error) {
        showError(error)
      } 

    }

    fetchSingleTask()
  }, [TaskId]);


  

  const completeTask = async () => {
    try {
      const res = await dispatch(updateTheTaskInfo({ task: singleTask, name: "completedTask" })).unwrap();
      showSuccess(res.message);
      navigate("/employee");
    } catch (error) {
      showError(error);
    }
  };

  const handleDeleteTask = async (id) => {  
    try {
      const confirmToDelete = confirm('Do you want to delete this task?');
      if (!confirmToDelete) return;

      const deletedTask = await dispatch(deleteTaskThunk(id)).unwrap()
      showSuccess(deletedTask.message);
      navigate("/admin");
    } catch (error) {
      showError(error);
    }
  };

  const handleAccept = async(task) => {
    console.log(task , 'task' , task.$id , task.taskId);
    
    const payload = {
       taskId : task.$id,
       taskAction : "Accepted",
       message : task.userRejectReason ? task.userRejectReason : "none",
       adminAction : task.adminAction ? task.adminAction : "pending"

    }
       try {
          const result = await dispatch(handleUserTaskAction(payload)).unwrap()
          if(result){
            showSuccess("Task Accepted Sucessfully")
            navigate('/employee')
          }
       } catch (error) {
        console.log(error);
          showError(error)
       }
  }


  const handleReject = async(message) => {
    console.log(singleTask , 'task' , singleTask.$id , singleTask.taskId);
   
    const payload = {
       taskId : singleTask.$id,
       taskAction : "rejected",
       message : message.reasonForReject ? message.reasonForReject : "none",
       adminAction : singleTask.adminAction

    }
       try {
          const result = await dispatch(handleUserTaskAction(payload)).unwrap()
          if(result){
            showSuccess("Task Accepted Sucessfully")
            navigate('/employee')
          }
       } catch (error) {
        console.log(error);
          showError(error)
       }
  }

  if (loading || !singleTask) {
    return <Loader />;
  }

  return (
    <div className="w-full calc(100vh - 30px) bg-[#111111] flex flex-col gap-8 px-10 py-12 rounded-xl shadow-xl">
      {/* Task Header */}
      <div className="flex justify-between items-center">
        <div className="flex gap-5">
          <span
            className={`w-24 py-2 px-6 text-white flex justify-center items-center ${singleTask.Urgent ? 'bg-red-600' : 'bg-green-600'} capitalize rounded-lg text-sm font-semibold`}
          >
            {singleTask.Urgent ? 'Urgent' : 'Normal'}
          </span>
          <button
            className={`w-32 py-2 text-sm font-medium rounded-lg text-white ${singleTask.isComplete ? 'bg-green-600' : 'bg-yellow-600'}`}
          >
            {singleTask.isCompleted ? 'Completed' : 'Not Completed' }
          </button>
        </div>

        <div className="flex items-center gap-4">
          <MessageIcon info={singleTask} />
          {currentUserDetails.admin && (
            <>
              <Link to={`/editTask/${singleTask.$id}`}>
                <FaRegEdit className="w-10 h-10 p-2 rounded-lg text-white bg-blue-600 hover:bg-blue-500 transition duration-200" />
              </Link>
              <button
                onClick={() => handleDeleteTask(singleTask.$id)}
                className="w-10 h-10 p-2 rounded-lg text-white bg-red-600 hover:bg-red-500 transition duration-200"
                title="Delete Task"
              >
                <FaRegTrashAlt size={20} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Task Date */}
      <span className="text-sm text-gray-400 mt-2">{singleTask.Date}</span>

      {/* Task Details */}
      <div className="flex flex-col gap-4 mt-5">
        <h1 className="text-2xl font-bold text-white">{singleTask.Tittle}</h1>
        <span className="text-sm text-gray-300">{singleTask.Category}</span>
        {
          currentUserDetails.admin && <span className="text-sm text-gray-300">{singleTask.AssignTo}</span>
        }
        
        <p className="text-sm text-gray-300">{singleTask.Description}</p>
      </div>

      {/* Complete / Delete Button */}
      <div className="flex gap-8 mt-8 items-center">
       {
        (singleTask.status == "new") ? 
        <div className='flex items-center justify-end gap-3'>
    <button
            onClick={() => {handleAccept(singleTask)}}
            className='bg-green-500 px-3 py-1 rounded-lg text-sm capitalize'
            title='Complete Task'
          >
           accept
          </button>
          <button
            onClick={() => {setReject(true)}}
            className='bg-red-500 px-3 py-1 rounded-lg text-sm capitalize'
            title='Complete Task'
          >
           Reject
          </button>
    </div> :  
        (!currentUserDetails.admin && !singleTask.isCompleted) && <button
            onClick={() => {completeTask()}}
            className="w-44 h-8 bg-sky-400 text-gray-900 font-medium text-md rounded-lg hover:bg-gray-900 hover:text-white transition duration-300"
          >
            Complete Task
          </button>
       
       }
          
      </div>
       {
         reject && <div>
            <form
            onSubmit={handleSubmit(handleReject)}
             action="" 
            >
             <Input lable="Reason for Reject" type="text"
             {...register("reasonForReject" , {required : true})}
             />
               
              <Button type="submit" className="mt-5  w-full h-9 bg-green-500  text-white font-medium rounded-md hover:bg-green-600" btn="Submit" />
            </form>
          </div>
       }

      {/* Chat Box */}
      <div className="mt-10">
      <ChatBox/>
      </div>
    </div>
  );
};

export default memo(TaskFullPage);
