import { createSlice } from "@reduxjs/toolkit";
import { deleteTaskThunk , fetchTask, handleCompleteTask, handleUserTaskAction ,taskAllDetails} from "./thunks/taskThunk";
import { AllTask } from "../export";
import { categorizeAndUpdateState } from "../utlity/categorizeAndUpdateState ";
import { resetTaskCategory } from "../utlity/resetTaskCategory";


const taskSlice = createSlice({
  name: "task",
  initialState: {
    allTask: [],
    loaderForSkeleton: false,
    loading: false,
    error: null,
    completedTask: {
       value : 0,
       task : [],
       name : "completed"
    },
    newTask : {
       value : 0,
       task : [],
       name : 'new'
    },
    acceptedTask : {
       value : 0, 
       task : [],
       name : 'accepted'
    },
    rejectedTask : {
        value : 0,
        task : [],
        name : "rejected"
    }

  },
  reducers: {
    addNewTask: (state, action) => {
      state.newTask.task = [...state.newTask.task , action.payload]
      state.newTask.value += 1
    },
    updateTaskRealtime: (state, action) => {
      // console.log(action.payload , 'update');
      
//       if(action.payload.admin){
// const index = state.allTask.findIndex(task => task.$id === action.payload.$id);
//       if (index !== -1) state.allTask[index] = action.payload;
//       }else{
//       }
           const task = action.payload;
  const index = state.allTask.findIndex(t => t.$id === task.$id);
  if (index !== -1) {
    state.allTask[index] = task;
  } else {
    
    
    console.log("working" , task);
    categorizeAndUpdateState(task, state);
  }

      
    },
    deleteTaskRealtime: (state, action) => {
      state.tasks = state.tasks.filter(task => task.$id !== action.payload);
    },
    setUpdateTask: (state, action) => {
      // unused reducer – consider removing or implement if needed
    },
    setLoader: (state, action) => {
      state.loading = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      // Fetch Task
      .addCase(fetchTask.pending, state => {
        state.loaderForSkeleton = true;
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        
        state.loaderForSkeleton = false;
        resetTaskCategory(state)
      
           action.payload.res.forEach(task => {
                categorizeAndUpdateState(task, state);
            });
       
         
            
        
          
 
      })
      .addCase(fetchTask.rejected, (state, action) => {
        state.loaderForSkeleton = false;
        state.error = action.payload;
      })

      // Update Task
      .addCase(handleCompleteTask.pending, state => {
        state.loading = true;
      })
      .addCase(handleCompleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.allTask = state.allTask.filter(task => task.$id !== action.payload.$id)
      })
      .addCase(handleCompleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Single Task
      .addCase(taskAllDetails.pending, state => {
        state.loading = true;
      })
      .addCase(taskAllDetails.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(taskAllDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Task
      .addCase(deleteTaskThunk.pending, state => {
        state.loading = true;
      })
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter(task => task.$id !== action.payload.data);
      })
      .addCase(deleteTaskThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      
      .addCase(handleUserTaskAction.pending, state => {
        state.loading = true;
      })
      .addCase(handleUserTaskAction.fulfilled, (state, action) => { 
        state.loading = false;
       state.newTask.task = state.newTask.task.filter(item => item.$id !== action.payload.$id)
       state.newTask.value -= state.newTask.value > 0 ? 1 : 0
      })
      .addCase(handleUserTaskAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export const {
  deleteTaskRealtime,
  addNewTask,
  updateTaskRealtime,
  setUpdateTask,
  setLoader
} = taskSlice.actions;

export default taskSlice;
