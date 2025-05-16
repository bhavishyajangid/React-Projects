import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TaskServices from '../../Appwrite/Task';
import { toast } from 'react-toastify';
import { ChatBox, Loader } from '../../export';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { BsFillChatTextFill } from 'react-icons/bs';
import MessageIcon from '../../components/MessageIcon';
import { setUpdateTask } from '../../Store/TaskSlice';
import dataBaseServices from '../../Appwrite/Database';
import { updatenewTaskValue } from '../../Store/authSlice';
import { setLoader } from '../../Store/otpSendSlice';
import { taskAllDetails, updateTheTaskInfo } from '../../Store/thunks/taskThunk';

const TaskFullPage = () => {
  const { currentUserDetails } = useSelector((state) => state.authSlice);
  const {loading  , singleTask} = useSelector(state => state.taskSlice)
  // const [singleTask, setsingleTask] = useState(null);
  const { TaskId } = useParams();
  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(taskAllDetails(TaskId))
  }, [TaskId]);


  const completeTask = async() => {
   dispatch(updateTheTaskInfo({ task: singleTask, name: "completedTask" , navigate }));
  };


  const deleteTask = async (id) => {
      const confirmToDelete = confirm('Do you want to delete this task?');
    if (confirmToDelete) {
       dispatch(deleteTask(id , navigate))
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="w-full min-hscreen  bg-[#111111] flex flex-col gap-8 px-10 py-12 rounded-xl shadow-xl">
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
              {singleTask.isComplete ? 'Completed' : 'Not Completed'}
            </button>
          </div>

          <div className="flex items-center gap-4">
            <MessageIcon info={singleTask} />
            {currentUserDetails.admin && (
              <Link to={`/editTask/${singleTask.$id}`}>
                <FaRegEdit className="w-10 h-10 p-2 rounded-lg text-white bg-blue-600 hover:bg-blue-500 transition duration-200" />
              </Link>
            )}
            {currentUserDetails.admin && (
              <button
                onClick={() => deleteTask(singleTask.$id)}
                className="w-10 h-10 p-2 rounded-lg text-white bg-red-600 hover:bg-red-500 transition duration-200"
                title="Delete Task"
              >
                <FaRegTrashAlt size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Task Date */}
        <span className="text-sm text-gray-400 mt-2">{singleTask.Date}</span>

        {/* Task Details */}
        <div className="flex flex-col gap-4 mt-5">
          <h1 className="text-2xl font-bold text-white">{singleTask.Tittle}</h1>
          <span className="text-sm text-gray-300">{singleTask.Category}</span>
          <span className="text-sm text-gray-300">{singleTask.AssignTo}</span>
          <p className="text-sm text-gray-300">{singleTask.Description}</p>
        </div>

        {/* Complete Button */}
        <div className="flex gap-8 mt-8 items-center">
          {currentUserDetails.admin ? 
            <button
              onClick={() => deleteTask(singleTask.$id)}
              className="w-44 h-8 bg-red-600 text-white font-medium text-md rounded-lg hover:bg-red-500 transition duration-300"
            >
              <FaRegTrashAlt size={14} className="inline mr-2" />
              Delete Task
            </button> : 
            <button
              onClick={() => {completeTask()}}
              className="w-44 h-8 bg-sky-400 text-gray-900 font-medium text-md rounded-lg hover:bg-gray-900 hover:text-white transition duration-300"
            >
              Complete Task
            </button>
          }
        </div>

        {/* Chat Box */}
        <div className="mt-10">
          <ChatBox />
        </div>
      </div>
    </>
  );
};

export default memo(TaskFullPage);
