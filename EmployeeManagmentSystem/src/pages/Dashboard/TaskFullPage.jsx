import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  taskAllDetails,
  deleteTaskThunk,
  handleUserTaskAction,
  handleCompleteTask,
} from "../../Store/thunks/taskThunk";
import { showError, showSuccess } from "../../utlity/Error&Sucess";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import MessageIcon from "../../components/MessageIcon";
import Loader from "../../components/Loader";
import ChatBox from "../admin/ChatBox";
import { AcceptOrReject, AdminOption, Button, Input, Status } from "../../export";

const TaskFullPage = () => {
  const { currentUserDetails } = useSelector((state) => state.authSlice);
  const { loading } = useSelector((state) => state.taskSlice);
  const [singleTask, setSingleTask] = useState();

  const { TaskId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSingleTask = async () => {
      try {
        const res = await dispatch(taskAllDetails(TaskId)).unwrap();
        if (res) {
          setSingleTask(res);
        }
      } catch (error) {
        showError(error);
      }
    };

    fetchSingleTask();
  }, [TaskId]);

  const completeTask = async () => {
    try {
      const res = await dispatch(handleCompleteTask(singleTask.$id)).unwrap();
      if (res) {
        showSuccess("Task Updated Sucessfully");
        navigate("/employee");
      }
    } catch (error) {
      console.log(error);

      showError(error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const confirmToDelete = confirm("Do you want to delete this task?");
      if (!confirmToDelete) return;

      const deletedTask = await dispatch(deleteTaskThunk(id)).unwrap();
      showSuccess(deletedTask.message);
      navigate("/admin");
    } catch (error) {
      showError(error);
    }
  };

  if (loading || !singleTask) {
    return <Loader />;
  }

  return (
    <div className="w-full calc(100vh - 30px) bg-[#111111] flex flex-col gap-8 px-10 py-12 rounded-xl shadow-xl">
      {/* Task Header */}
      <div className="flex justify-between items-center">
        <div className="flex gap-5">
          <span
            className={`w-24 py-2 px-6 text-white flex justify-center items-center ${
              singleTask.Urgent ? "bg-red-500" : "bg-green-500"
            } capitalize rounded text-sm font-semibold`}
          >
            {singleTask.Urgent ? "Urgent" : "Normal"}
          </span>

          <Status task={singleTask} isAdmin={currentUserDetails.admin} />
        </div>

        <AdminOption task={singleTask} type="full"/>
      </div>

      {/* Task Date */}
      <span className="text-sm text-gray-400 mt-2">{singleTask.Date}</span>

      {/* Task Details */}
      <div className="flex flex-col gap-4 mt-5">
        <h1 className="text-2xl font-bold text-white">{singleTask.Tittle}</h1>
        <span className="text-sm text-gray-300">{singleTask.Category}</span>
        {currentUserDetails.admin && (
          <span className="text-sm text-gray-300">{singleTask.AssignTo}</span>
        )}

        <p className="text-sm text-gray-300">{singleTask.Description}</p>
      </div>

      {/* Complete / Delete Button */}
      <div className="flex gap-8 mt-8 items-center">
        {(singleTask.status == "new" && !currentUserDetails.admin) ||
        (singleTask.status == "pending" && currentUserDetails.admin) ? (
          <AcceptOrReject task={singleTask} isAdmin={currentUserDetails.admin} />
        ) : (
          !currentUserDetails.admin &&
          !singleTask.isCompleted && (
            <button
              onClick={() => {
                completeTask();
              }}
              className="w-44 h-8 bg-sky-400 text-gray-900 font-medium text-md rounded-lg hover:bg-gray-900 hover:text-white transition duration-300"
            >
              Complete Task
            </button>
          )
        )}
      </div>

      {/* Chat Box */}
      <div className="mt-10">
        <ChatBox />
      </div>
    </div>
  );
};

export default memo(TaskFullPage);
