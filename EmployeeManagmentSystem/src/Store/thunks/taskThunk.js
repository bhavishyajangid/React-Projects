import { createAsyncThunk } from "@reduxjs/toolkit";
import TaskServices from "../../Appwrite/Task";
import { getTaskStatus } from "../../utlity/getTaskStatus";
import { data } from "react-router";

//  1. Fetch Task
export const fetchTask = createAsyncThunk(
  "task/fetchTask",
  async (user, { rejectWithValue }) => {
    try {
      if (user.admin) {
        const res = await TaskServices.getAllTask();
        return {res : res.documents , 
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
export const handleCompleteTask = createAsyncThunk(
  "task/update",
  async ( taskId , {  rejectWithValue }) => {
    try {
    
       const res = await TaskServices.updateTask(taskId , {isCompleted : true , sendBack : false})
      if (res) {
        return res
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
        return deleteTask
      }
    } catch (error) {
      console.log(error);
      
      return rejectWithValue(error.message || "Error deleting task");
    }
  }
);



export const handleUserTaskAction = createAsyncThunk(
  "task/userAction",
  async (params, { rejectWithValue }) => {
    const {taskId , userAction , message , adminAction , sendBack , isCompleted} = params
    
     console.log(userAction , adminAction , 'rejectedBy');

    try {
      const { status, rejectedBy } = getTaskStatus(userAction, adminAction , sendBack);
      
      const updatePayload = {
        userAction,
        status,
        rejectedBy,
        adminAction,
        reasonForReject: message,
        sendBack,
        isCompleted
      };
      console.log(updatePayload , 'updatepayload');
     
      

      const response = await TaskServices.updateTask(taskId, updatePayload);
      console.log(response , 'response after update');
      
      return response;
    } catch (error) {
      console.log(error);
      
      return rejectWithValue("Something went wrong");
    }
  }

  
);

export const handleFilterTask = createAsyncThunk(
  'task/filter' ,

  async(data , {rejectWithValue}) => {
     try {
       const res =  TaskServices.filterAllTask(data)
       return res
     } catch (error) {
        return rejectWithValue(error)
     }
  }
)



