
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import TaskServices from "../../Appwrite/Task";
import dataBaseServices from "../../Appwrite/Database";
import { updatenewTaskValue } from "../authSlice";
import { Navigate } from "react-router";
export const fetchTask = createAsyncThunk(
    "task/fetchTask" ,
    
    async(user, {rejectWithValue}) => {
       console.log(user , "userId");
        try {
            if(user.admin){
                const res = await TaskServices.getAllTask()
                return res.documents;
            }else{
                 const res = await TaskServices.getUserTask(user.userId)
                 console.log(res , 'response');
                 return res
            }
        } catch (error) {
            toast.error(error)
        }
    },
)

export const updateTheTaskInfo = createAsyncThunk(
  "task/update",
  async ({ task, name , navigate}, { getState, rejectWithValue, dispatch }) => {
    try {

      const state = getState();
      const user = state.authSlice.currentUserDetails;  

      // Prepare update fields depending on 'name' action
      const res = await dataBaseServices.updateUser(user.$id , user.completedTask , name , task)

      if(res){ 
        dispatch(updatenewTaskValue(res.newTask))
        navigate("/employee")
        toast.success("task completed sucessfully")
            return res
        }
      

      
    } catch (error) {
      toast.error("Error updating task: " + error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const taskAllDetails = createAsyncThunk(
    "task/alldetails",

    async(taskId , {rejectWithValue}) => {
            try {
        let res = await TaskServices.getSingleTask(taskId);
        if(res){
            return res
        }
      } catch (error) {
        toast.error('Unable to Fetch Task Details');
          return rejectWithValue(error.message);
      }
    }
) 

export const deleteTask = createAsyncThunk(
     "task/delete", 

     async({ taskId , navigate} ,{rejectWithValue}) => {
        try {
        const deleteUser = await TaskServices.deleteTask(taskId);
        if (deleteUser) {
          toast.success('Task deleted successfully');
          navigate('/home');
        }
      } catch (error) {
        toast.error('Task Not Deleted. Try Again After Some Time');
        return rejectWithValue(error.message)
      }
     }
)