import React, { useEffect, useState , useRef} from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import TaskServices from "../../Appwrite/Task";
import Button from "../../components/Button";
import Input from "../../components/Input";
import {  Loader } from "../../export";
import authServices from "../../Appwrite/Auth";


const SetNewTask = ({ task }) => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {currentUserDetails} = useSelector(state => state.authSlice)
  const {
    register,
    handleSubmit,
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

  const input = [
    {
      label: "Tittle",
      type: "text",
      placeholder: "Make a UI design",
    },

    {
      label: "Date",
      type: "date",
      placeholder: "Make a UI design",
      maxlenght : 4
    },

    {
      label: "AssignTo",
      type: "text",
      placeholder: "Employee name",
    },

    {
      label: "Category",
      type: "text",
      placeholder: "Design , dev , etc",
    },
  ];


  const handleUpdateTask = async (task, data) => {
    try {
      await TaskServices.updateTask(task.$id, data);
      toast.success("Task updated sucessfully");
      navigate(`/id/${task.$id}` , {replace : true});
    } catch (error) {
      console.log(error);
      
       toast.error("Something Went Wrong !! Try Again After Some Time")
    }
  };

  const handleReassignTask = async (data) => {
    const confirm = window.confirm("Reassign task to another employee?");
    if (!confirm) return;
  
    if (data.AssignTo === currentUserDetails.userName) {
      toast.warn("Cannot assign  to self.");
      return;
    }
  
    try {
      // 1. Create new task
      const newTask = await TaskServices.setTask(data);
  
      if (!newTask) {
        toast.error(`Employee Not Found ${data.AssignTo}`);
        return;
      }
  
      // 2. Delete old task
      const deleted = await TaskServices.deleteTask(task.$id);
  
      if (deleted) {
        toast.success(`Task assigned to ${newTask.AssignTo}`);
        navigate(`/id/${newTask.$id}`);
      } else {
        await TaskServices.deleteTask(newTask.$id);
        toast.error("Failed to delete old task. Reassignment rolled back.");
      }
  
    } catch (error) {
      toast.error(`Failed to Reassign Task To: ${error.message || error}`);
    }
  };
  

  const handleCreateTask = async (data) => {
    try {
     const task =  await TaskServices.setTask(data);
     console.log(task , typeof(task) , 'task');
     
     if (task) {
      toast.success("Task created successfully.");
      navigate("/task" , {replace: true});
      
    } else if (task == false) {
      toast.error(`${data.AssignTo} Employee not found.`);
    } else {
      toast.error("Failed to create task. Please try again later.");
    }
    } catch (error) {
      toast.error(`Something went wrong! ${error.message || "Please try again later."}`);
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
  if (loader) {
    return <Loader />;
  }
  return (
    <div className="w-full max-w-5xl m-auto mt-10 bg-white rounded-xl shadow-lg p-8">
  <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">Set New Task</h2>
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="flex max-lg:flex-col gap-8"
  >
    {/* Left Column */}
    <div className="w-full  flex flex-col gap-6">
      {input.map((item) => (
        <div key={item.label}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {item.label}
          </label>
          <input
            type={item.type}
            placeholder={item.placeholder}
            {...register(`${item.label}`, {
              required: `${item.label} is required`,
            })}
            className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-800 placeholder:text-gray-400 text-sm"
          />
        </div>
      ))}
    </div>

    {/* Right Column */}
    <div className="w-full flex flex-col gap-6">
      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          {...register("Description", {
            required: `Description is required`,
          })}
          className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none text-gray-800 bg-white text-sm"
        ></textarea>
      </div>

      {/* Urgent Checkbox */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          className="w-4 h-4 text-teal-600 border-gray-300 rounded"
          {...register("Urgent")}
        />
        <label className="text-sm text-gray-700">Mark as Urgent</label>
      </div>

      {/* Submit Button */}
      <Button
        className="w-full h-10 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 transition duration-200"
        type="submit"
        btn="Submit"
      />
    </div>
  </form>
</div>

  );
};

export default SetNewTask;
