import { createAsyncThunk } from "@reduxjs/toolkit";
import TaskServices from "../../Appwrite/Task";
import dataBaseServices, { databaseServices } from "../../Appwrite/Database";
import { updatenewTaskValue } from "../authSlice";
import { getTaskStatus } from "../../utlity/getTaskStatus";

//  1. Fetch Task
export const fetchTask = createAsyncThunk(
  "task/fetchTask",
  async (user, { rejectWithValue }) => {
    try {
      if (user.admin) {
        const res = await TaskServices.getAllTask();
        return {res : res , 
                admin : true}
      } else {
        const res = await TaskServices.getUserTask(user.userId);
  
        console.log(res , "res");
        
        return {res : res , 
                admin : false}
      }
    } catch (error) {
      console.log(error);
      
      return rejectWithValue("Failed to fetch tasks");
    }
  }
);

// ✅ 2. Update Task Info (mark complete)
export const updateTheTaskInfo = createAsyncThunk(
  "task/update",
  async ({ task, name }, { getState, rejectWithValue, dispatch }) => {
    try {
      const state = getState();
      const user = state.authSlice.currentUserDetails;

      const res = await dataBaseServices.updateUser(user.$id, user.completedTask, name, task);

      if (res) {
        
        dispatch(updatenewTaskValue(res.completedTask));
        return {
          message: "Task completed successfully",
          data: res.task
        };
      } else {
        return rejectWithValue("Failed to update task");
      }
    } catch (error) {
      return rejectWithValue(error.message || "Error updating task");
    }
  }
);

// ✅ 3. Get Single Task Details
export const taskAllDetails = createAsyncThunk(
  "task/alldetails",
  async (taskId, { rejectWithValue }) => {
    try {
      const res = await TaskServices.getSingleTask(taskId);
      if (res) return res;
      return rejectWithValue("Task not found");
    } catch (error) {
      return rejectWithValue("Unable to fetch task details");
    }
  }
);

// ✅ 4. Delete Task
export const deleteTaskThunk = createAsyncThunk(
  "task/delete",
  async ( taskId , { rejectWithValue }) => {
    try {
      console.log(taskId , "taskid");
      
      const deleteTask = await TaskServices.deleteTask(taskId);
      console.log(deleteTask , "deletetask");
      
      if (deleteTask) {
        return {
          message: "Task deleted successfully",
          data: deleteTask.$id
        };
      }
    } catch (error) {
      console.log(error);
      
      return rejectWithValue(error.message || "Error deleting task");
    }
  }
);


export const handleCompletedTask = createAsyncThunk(
   'task/completed',

   async( _ ,{rejectWithValue}) => {
    try {
        const result = await dataBaseServices.fetchCompletedTask()
        if(result){
           return result
        }
    } catch (error) {
      console.log(error);
      
       return rejectWithValue(error)
    }
   }
)

export const handleUserTaskAction = createAsyncThunk(
  "task/userAction",
  async ({ taskId, taskAction, message = "none", adminAction= "pending" }, { rejectWithValue }) => {
    console.log(taskId ,taskAction , message , adminAction);
    
    

    try {
      const { status, rejectedBy } = getTaskStatus(taskAction, adminAction);

      const updatePayload = {
        userAction: taskAction,
        status,
        rejectedBy,
        userRejectReason: taskAction === "rejected" ? message || "" : 'none',
      };

      const response = await TaskServices.updateTask(taskId, updatePayload);
      console.log(response , 'response after update');
      
      return response;
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);

