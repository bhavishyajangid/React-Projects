import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import TaskServices from "../../Appwrite/Task";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Loader } from "../../export";
import { addNewTask } from "../../Store/authSlice";

const SetNewTask = ({ task }) => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const setNewTask = async (data) => {
    setLoader(true);
    if (task) {
      if (task.AssignTo === data.AssignTo) {
        // update the task 
        const updatedTask = await TaskServices.updateTask(task.$id, data);
        if (updatedTask) {
          toast.success("task is updated sucessfully");
          navigate(`/id/${updatedTask.$id}`);
        } else {
          toast.error("failed to update task");
        }
      } else {

        // confirm to assing the task to another employee
        const confirmToAssign = confirm("do you want assign this task to another empolyee");
        if (confirmToAssign) {

          // set the task to the new employee

          const addTaskToEmployee = await TaskServices.setTask(data);

          // if the task is sucessfully assignn to other employee then delete this task from previos empolyee
          if (addTaskToEmployee) {
            const deleteTaskFromEmployee = await TaskServices.deleteTask(task.$id);
            
           
            // if the task sucessfully deleted or assign to another employee then navigate it to previos page
            if (deleteTaskFromEmployee) {
              toast.success(
                `task sucessfully updated or assign to ${addTaskToEmployee.AssignTo}`
              );
              navigate(`/id/${addTaskToEmployee.$id}`);

            } else {

              // if the task is assign to new Employee but not deleted from previous employee so give an error 
              const deleteAddTaskToEmployee = await TaskServices.deleteTask(
                addTaskToEmployee.$id
              );
               
              if (deleteAddTaskToEmployee) {
                toast.error(`failed to assign this task to ${data.AssignTo} `);
              }
            }
          } else {
            toast.error(`${data.AssignTo} employee is not found`);
          }
        }
      }
    } else {
      try {

        // add new task
        const userTask = await TaskServices.setTask(data);
        console.log(userTask);
        if (userTask) {
          dispatch(addNewTask(userTask));
          navigate("/home");
          toast.success("Task Set Sucessfully");
        } else {
          toast.error(`${data.AssignTo}  not found`);
        }
      } catch (error) {
        toast.error(error);
      }
    }

    setLoader(false);
  };
  if (loader) {
    return <Loader />;
  }
  return (
    <div className="w-11/12 min-h-96 m-auto p-5 flex flex-col justify-center    bg-[#1C1C1C] rounded-lg mt-10">
      <form
        onSubmit={handleSubmit(setNewTask)}
        className="flex max-sm:flex-col  py-5 "
        action=""
      >
        <div className="w-1/2  max-sm:w-full max-sm:pr-0 pr-10 flex flex-col gap-8 ">
          {input.map((item) => (
            <Input
              label={item.label}
              type={item.type}
              placeholder={item.placeholder}
              className="w-full h-9  border border-gray-500 border-solid rounded-lg text-white px-2 bg-transparent outline-none placeholder:text-sm "
              {...register(`${item.label}`, {
                required: `${item.label} is required `,
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
