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
      navigate(`/id/${task.$id}`);
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
      navigate("/admin");
      
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
    <div className="w-11/12 min-h-96 m-auto p-5 flex flex-col justify-center    bg-[#1C1C1C] rounded-lg mt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex max-sm:flex-col  py-5 "
        action=""
      >
        <div className="w-1/2  max-sm:w-full max-sm:pr-0 pr-10 flex flex-col gap-8 ">
       {input.map((item) => (
  <Input
    key={item.label}
    label={item.label}
    type={item.type}
    placeholder={item.placeholder}
    className="w-full h-9 border border-gray-500 border-solid rounded-lg text-white px-2 bg-transparent outline-none placeholder:text-sm"
    {...register(`${item.label}`, {
      required: `${item.label} is required`,
    })}
  />
))}
        </div>

        <div className="w-1/2 max-sm:w-full max-sm:pl-0 max-sm:mt-5 pl-10 flex flex-col max-sm:gap-5  ">
          <div>
            <label
              htmlFor="description"
              className="block  text-white text-base"
            >
              Description
            </label>
            <textarea
              className="w-full h-48 outline-none bg-transparent border border-solid border-gray-500 rounded-lg p-2 mt-1 overflow-y-scroll scroll-bar"
              name=""
              id="description"
              {...register("Description", {
                required: `Description is required `,
              })}
            ></textarea>

            <div className="flex  gap-2 items-center">
              <Input
                className="w-5 h-4"
                type="checkbox"
                {...register("Urgent")}
              />
              <label htmlFor="">Urgent</label>
            </div>
          </div>
          <Button
            className="w-full h-9 bg-green-500  text-white font-medium rounded-md hover:bg-green-600 mt-9"
            type="submit"
            btn="Submit"
          />
        </div>
      </form>
    </div>
  );
};

export default SetNewTask;
