import { createSlice } from "@reduxjs/toolkit";
import { deleteTaskThunk , fetchTask, handleCompletedTask, handleUserTaskAction ,taskAllDetails, updateTheTaskInfo } from "./thunks/taskThunk";
import { AllTask } from "../export";
import { categorizeAndUpdateState } from "../utlity/categorizeAndUpdateState ";

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
          if(action.payload.admin){
              state.allTask= action.payload.res.documents
          }else{
             action.payload.res.forEach(task => {
          categorizeAndUpdateState(task, state);
            });
        
          }
 
      })
      .addCase(fetchTask.rejected, (state, action) => {
        state.loaderForSkeleton = false;
        state.error = action.payload;
      })

      // Update Task
      .addCase(updateTheTaskInfo.pending, state => {
        state.loading = true;
      })
      .addCase(updateTheTaskInfo.fulfilled, (state, action) => {
        state.loading = false;

        // Update task in list
        state.tasks = state.tasks.map(task =>
          task.$id === action.payload.data.$id
            ? { ...task, isCompleted: true }
            : task
        );

        // Add to completeTask
        state.completedTask.push(action.payload.data);
      })
      .addCase(updateTheTaskInfo.rejected, (state, action) => {
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

      .addCase(handleCompletedTask.pending, state => {
        state.loading = true;
      })
      .addCase(handleCompletedTask.fulfilled, (state, action) => {
        console.log(action.payload , "action");
        
        state.loading = false;
        // state.completedTask =  action.payload
      })
      .addCase(handleCompletedTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(handleUserTaskAction.pending, state => {
        state.loading = true;
      })
      .addCase(handleUserTaskAction.fulfilled, (state, action) => { 
        state.loading = false;
       state.newTask.task = state.newTask.task.filter((item) => item.$id !== action.payload)
       state.newTask.value -= state.newTask.value > 0 ? 1 : 0
       if(action.payload.status == "rejected"){
          state.rejectedTask.task = [...state.rejectedTask.task , action.payload]
          state.rejectedTask.value += 1
       }
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
