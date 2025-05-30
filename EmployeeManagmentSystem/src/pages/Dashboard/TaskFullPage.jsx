import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { AcceptOrReject, AdminOption, Status } from "../../export";
import {
  handleCompleteTask,
  taskAllDetails,
} from "../../Store/thunks/taskThunk";
import { showError, showSuccess } from "../../utlity/Error&Sucess";
import ChatBox from "../admin/ChatBox";

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
        showSuccess("Task Updated Successfully");
        navigate("/employee");
      }
    } catch (error) {
      showError(error);
    }
  };

  if (loading || !singleTask) {
    return <Loader />;
  }

  return (
    <div className="w-full min-h-screen bg-[#f9fafb] p-8 rounded-xl shadow-md text-gray-800 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex gap-4 flex-wrap items-center">
          <span
            className={`text-sm font-medium px-3 py-1 rounded-full text-white ${
              singleTask.Urgent ? "bg-red-400" : "bg-green-400"
            }`}
          >
            {singleTask.Urgent ? "Urgent" : "Normal"}
          </span>

          <Status task={singleTask} isAdmin={currentUserDetails.admin} />
        </div>

        <AdminOption task={singleTask} type="full" />
      </div>

      {/* Date */}
      <p className="text-xs text-gray-500">Created on: {singleTask.Date}</p>

      {/* Task Info */}
      <div className="space-y-5">
        {/* Title */}
        <div className="flex gap-2 items-center">
          <label className="text-sm font-medium text-gray-600">Title : - </label>
          <h1 className="text-base capitalize font-bold text-gray-700">{singleTask.Tittle}</h1>
        </div>

        {/* Category */}
        <div className="flex gap-2 items-center">
          <label className="text-sm font-medium text-gray-600">Category : - </label>
          <p className="text-base text-gray-700">{singleTask.Category}</p>
        </div>

        {/* Assigned To */}
        {currentUserDetails.admin && (
          <div>
            <label className="text-sm font-medium text-gray-600">Assigned To :  </label>
            <p className="inline-block bg-indigo-300 text-indigo-800 text-xs px-3 py-1 rounded-full font-medium">
              {singleTask.AssignTo}
            </p>
          </div>
        )}

        {/* Rejected By */}
        {singleTask.status === "rejected" && (
          <div>
            <label className="text-sm font-medium text-red-600">Rejected By</label>
            <p className="inline-block bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-medium mt-1">
              {(singleTask.rejectedBy === "user" && !currentUserDetails.admin)
                ? "You"
                : (singleTask.rejectedBy === "admin" && currentUserDetails.admin)
                ? "You"
                : currentUserDetails.admin
                ? "User"
                : "Admin"}
            </p>
          </div>
        )}

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-gray-600">Description</label>
          <p className="mt-1 text-sm text-gray-800 whitespace-pre-line bg-white rounded-md px-4 py-3 shadow-sm border border-gray-200">
            {singleTask.Description}
          </p>
        </div>

        {/* Reason for Rejection */}
        {singleTask.reasonForReject && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <h2 className="text-sm font-semibold text-yellow-800">
              {singleTask.sendBack ? "Reason for SendBack" : "Reason for Rejection"}
              </h2>
            <p className="text-sm text-yellow-700 mt-1">{singleTask.reasonForReject}</p>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 pt-4">
        {(singleTask.status === "new" && !currentUserDetails.admin) ||
        (singleTask.status === "pending" &&
          singleTask.isCompleted &&
          currentUserDetails.admin) ? (
          <AcceptOrReject task={singleTask} isAdmin={currentUserDetails.admin} />
        ) : (
          !currentUserDetails.admin &&
          !singleTask.isCompleted && (
            <button
              onClick={completeTask}
              className={`px-6 py-2 rounded-lg font-medium text-sm transition duration-300 ${
                singleTask.sendBack
                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                  : "bg-blue-100 text-blue-800 hover:bg-blue-200"
              }`}
            >
              {singleTask.sendBack ? "Re-submitted" : "Complete Task"}
            </button>
          )
        )}
      </div>

      {/* Chat Box */}
      <div className="pt-8">
        <ChatBox />
      </div>
    </div>
  );
};

export default memo(TaskFullPage);
