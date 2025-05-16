import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TaskServices from "../Appwrite/Task";
import { toast } from "react-toastify";
import dataBaseServices from "../Appwrite/Database";
import { deleteTask, fetchTask , taskAllDetails, updateTheTaskInfo } from "./thunks/taskThunk";


const taskSlice = createSlice({
    name : "task" ,
    initialState : {
        tasks : [],
        loaderForSkeleton : false ,
        loading : false , 
        error : null,
        completeTask : [],
        singleTask : {}
    }, 
    reducers : {
        addNewTask: (state, action) => {
            state.tasks = [...state.tasks , action.payload]
          },
          updateTaskRealtime: (state, action) => {
            const index = state.tasks.findIndex((task) => task.$id === action.payload.$id);
            if (index !== -1) state.tasks[index] = action.payload;
          },
          deleteTaskRealtime: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.$id !== action.payload);
          },
          setUpdateTask : (state , action) => {
            //  console.log(action.payload , "payload");
             
            //  state.tasks = state.tasks.filter((item) => {
            //         if(item.$id == action.payload.$id) item.isCompleted = true
            //         return item
            //  })

            //  state.completeTask = [...state.completeTask , action.payload]   
          },

          setLoader : (state , action) => {
            state.loading = action.payload
          }
    } , 

    extraReducers : (builder) => {

        builder.addCase(fetchTask.pending , (state) => {
            state.loaderForSkeleton = true

        })
        .addCase(fetchTask.fulfilled , (state , action) => {
            state.loaderForSkeleton = false,
            state.tasks = action.payload
        })
        .addCase(fetchTask.rejected , (state , action) => {
             state.loaderForSkeleton = false,
             state.error = action.payload
        })

        .addCase(updateTheTaskInfo.pending , (state) => {
            state.loading = true

        })
        .addCase(updateTheTaskInfo.fulfilled , (state , action) => {
            state.loading = false,
             state.tasks = state.tasks.filter((item) => {
                    if(item.$id == action.payload.task.$id) item.isCompleted = true
                    return item
             })

            state.completeTask = [...state.completeTask , action.payload.task]
        })
        .addCase(updateTheTaskInfo.rejected , (state , action) => {
             state.loading = false,
             state.error = action.payload
        })

      
       .addCase(taskAllDetails.pending , (state) => {
            state.loading = true

        })
        .addCase(taskAllDetails.fulfilled , (state , action) => {
         state.singleTask = action.payload
         state.loading = false
            
        })
        .addCase(taskAllDetails.rejected , (state , action) => {
             state.loading = false,
             state.error = action.payload
        })


         .addCase(deleteTask.pending , (state) => {
            state.loading = true

        })
        .addCase(deleteTask.fulfilled , (state) => {
         state.loading = false
            
        })
        .addCase(deleteTask.rejected , (state , action) => {
             state.loading = false,
             state.error = action.payload
        })

       

    }
})

export const {deleteTaskRealtime , addNewTask , updateTaskRealtime , setUpdateTask , setLoader} = taskSlice.actions

 export default taskSlice