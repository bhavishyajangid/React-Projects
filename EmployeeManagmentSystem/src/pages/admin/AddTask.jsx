import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import TaskServices from "../../Appwrite/Task";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Loader } from "../../export";

const SetNewTask = ({ task }) => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUserDetails, allEmployee } = useSelector(state => state.authSlice);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Tittle: task?.Tittle || "",
      Date: task?.Date || "",
      AssignTo: task?.AssignTo || "",
      Category: task?.Category || "",
      Description: task?.Description || "",
      Urgent: task?.Urgent || false,
    },
  });

  useEffect(() => {
    return () => {
      reset(); // reset form state on unmount
    };
  }, []);

  const inputFields = [
    {
      label: "Tittle",
      type: "text",
      placeholder: "Make a UI design",
    },
    {
      label: "Date",
      type: "date",
      placeholder: "Select deadline date",
    },
    {
      label: "Category",
      type: "text",
      placeholder: "Design, Dev, etc",
    },
  ];

  const handleUpdateTask = async (task, data) => {
    try {
      await TaskServices.updateTask(task.$id, data);
      toast.success("Task updated successfully");
      navigate(`/id/${task.$id}`, { replace: true });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Try again later.");
    }
  };

  const handleReassignTask = async (data) => {
    const confirm = window.confirm("Reassign task to another employee?");
    if (!confirm) return;

    if (data.AssignTo === currentUserDetails.userName) {
      toast.warn("Cannot assign to self.");
      return;
    }

    try {
      const newTask = await TaskServices.setTask(data);
      if (!newTask) {
        toast.error(`Employee Not Found: ${data.AssignTo}`);
        return;
      }

      const deleted = await TaskServices.deleteTask(task.$id);

      if (deleted) {
        toast.success(`Task assigned to ${newTask.AssignTo}`);
        navigate(`/id/${newTask.$id}`);
      } else {
        await TaskServices.deleteTask(newTask.$id);
        toast.error("Failed to delete old task. Rolled back.");
      }

    } catch (error) {
      toast.error(`Reassign failed: ${error.message || error}`);
    }
  };

  const handleCreateTask = async (data) => {
    try {
      const task = await TaskServices.setTask(data);
      if (task) {
        toast.success("Task created successfully");
        navigate("/task", { replace: true });
      } else {
        toast.error(`${data.AssignTo} employee not found`);
      }
    } catch (error) {
      toast.error(`Creation failed: ${error.message || "Try again"}`);
    }
  };

  const onSubmit = async (data) => {
    setLoader(true);
    if (task) {
      if (task.AssignTo === data.AssignTo) {
        await handleUpdateTask(task, data);
      } else {
        await handleReassignTask(data);
      }
    } else {
      await handleCreateTask(data);
    }
    setLoader(false);
  };

  if (loader) return <Loader />;

  return (
    <div className="w-full max-w-5xl m-auto mt-10 bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
        Set New Task
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex max-lg:flex-col gap-8">
        {/* Left Column */}
        <div className="w-full flex flex-col gap-6">
          {inputFields.map((field) => (
            <Input
              key={field.label}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              {...register(field.label, {
                required: `${field.label} is required`,
              })}
            />
          ))}

          {/* AssignTo (only for admin) */}
          
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assign To
              </label>
              <select
                {...register("AssignTo", {
                  required: "AssignTo is required",
                })}
                className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-800 text-sm"
              >
                <option value="">-- Select Employee --</option>
                {allEmployee?.map((emp) => (
                  <option key={emp.$id} value={emp.userName}>
                    {emp.userName}
                  </option>
                ))}
              </select>
              {errors.AssignTo && (
                <p className="text-red-500 text-xs mt-1">{errors.AssignTo.message}</p>
              )}
            </div>
        
        </div>

        {/* Right Column */}
        <div className="w-full flex flex-col gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              {...register("Description", {
                required: "Description is required",
              })}
              className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none text-gray-800 bg-white text-sm"
            ></textarea>
            {errors.Description && (
              <p className="text-red-500 text-xs mt-1">{errors.Description.message}</p>
            )}
          </div>

          {/* Urgent */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-4 h-4 text-teal-600 border-gray-300 rounded"
              {...register("Urgent")}
            />
            <label className="text-sm text-gray-700">Mark as Urgent</label>
          </div>

          <Button
            className="w-full h-10 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 flex justify-center items-center transition duration-200"
            type="submit"
            btn="Submit"
          />
        </div>
      </form>
    </div>
  );
};

export default SetNewTask;
