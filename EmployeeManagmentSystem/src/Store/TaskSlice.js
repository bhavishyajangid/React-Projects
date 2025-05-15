import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TaskServices from "../Appwrite/Task";
import { toast } from "react-toastify";


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
            return toast.error(error)
        }
    },
)

export const updateTheTaskInfo = createAsyncThunk(
    "task/update" , 
 
    async(taskId, ) => {
          console.log(taskId , "working");
             
        
        const newValue = value + 1
        console.log(taskId , newValue , name);
     
    }
)

const taskSlice = createSlice({
    name : "task" ,
    initialState : {
        tasks : [],
        loaderForSkeleton : false ,
        loading : false , 
        error : null,
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
          setComplete : () => {
             state.tasks = state.task.filter((item) => {
                    if(item.$id == action.payload.$id) item.isCompleted = true
                    return item
             })
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

       

    }
})

export const {deleteTaskRealtime , addNewTask , updateTaskRealtime , setComplete , setLoader} = taskSlice.actions

 export default taskSlice