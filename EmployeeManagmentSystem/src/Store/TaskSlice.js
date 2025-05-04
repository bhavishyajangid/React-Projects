import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TaskServices from "../Appwrite/Task";


export const fetchTask = createAsyncThunk(
    "task/fetchTask" ,
    
    
    async(user, {rejectWithValue}) => {
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
            return rejectWithValue(error.message)
        }
    },
)

 








const taskSlice = createSlice({
    name : "task" ,
    initialState : {
        tasks : [],
        loaderForSkeleton : false ,
        loading : false , 
        error : null
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



        // .addCase(createTask.pending , (state) => {
        //     state.loading = true
        // })
        // .addCase(createTask.fulfilled , (state , action) => {
        //      state.tasks = [...state.tasks , action.payload]
        // })
        // .addCase(createTask.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        //   })


        // .addCase(updateTask.pending , (state) => {
        //     state.loading = true
        // })

        // .addCase(updateTask.fulfilled , (state , action) => {
        //     const index = state.tasks.findIndex(task => task.$id === action.payload.$id)

        //     if(index !== -1 ){
        //        state.tasks[index] = action.payload
        //     }
        // })

        // .addCase(updateTask.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        //   })




        // .addCase(deleteTask.pending , (state) => {
        //     state.loading = true
        // })
        // .addCase(deleteTask.fulfilled , (state , action) => {
        //     state.loading = false;
        //     state.tasks = state.tasks.filter((task) => task.$id !== action.payload);
        // })
        // .addCase(deleteTask.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        //   })

    }
})

export const {deleteTaskRealtime , addNewTask , updateTaskRealtime} = taskSlice.actions

 export default taskSlice