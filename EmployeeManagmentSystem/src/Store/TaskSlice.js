import { createSlice } from "@reduxjs/toolkit";
import { categorizeAndUpdateState } from "../utlity/categorizeAndUpdateState ";
import { resetTaskCategory } from "../utlity/resetTaskCategory";
import {
  deleteTaskThunk,
  fetchTask,
  handleCompleteTask,
  handleFilterTask,
  handleUserTaskAction,
  taskAllDetails,
} from "./thunks/taskThunk";
import { AllEmployee } from "../export";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    allTask: [],
    loaderForSkeleton: false,
    loading: false,
    error: null,
    completedTask: {
      value: 0,
      task: [],
      name: "completed",
    },
    newTask: {
      value: 0,
      task: [],
      name: "new",
    },
    acceptedTask: {
      value: 0,
      task: [],
      name: "accepted",
    },
    rejectedTask: {
      value: 0,
      task: [],
      name: "rejected",
    },
  },
  reducers: {
    addNewTask: (state, action) => {
      state.newTask.task.push(action.payload);
      state.newTask.value += 1;
    },
    updateTaskRealtime: (state, action) => {
      categorizeAndUpdateState(action.payload, state, true);
    },
    deleteTaskRealtime: (state, action) => {
      state.newTask.task = state.newTask.task.filter(
        (task) => task.$id !== action.payload
      );
      state.newTask.value -= state.newTask.value > 0 ? 1 : 0;
      state.allTask = state.allTask.filter(
        (task) => task.$id !== action.payload
      );
    },
    setLoader: (state, action) => {
      state.loading = action.payload;
    },
    filterAllTask : (state , action) => {
      
      state.allTask = state.allTask.filter((item) => item.AssignTo == action.payload.employee)
      console.log(action.payload);
    }
    
  },
  extraReducers: (builder) => {
    builder
      // Fetch Task
      .addCase(fetchTask.pending, (state) => {
        state.loaderForSkeleton = true;
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        state.loaderForSkeleton = false;
        resetTaskCategory(state);

        action.payload.res.forEach((task) => {
          categorizeAndUpdateState(task, state, false);
        });
      })
      .addCase(fetchTask.rejected, (state, action) => {
        state.loaderForSkeleton = false;
        state.error = action.payload;
      })

      // Update Task
      .addCase(handleCompleteTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleCompleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.allTask;
        state.allTask = state.allTask.filter(
          (task) => task.$id !== action.payload.$id
        );
      })
      .addCase(handleCompleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Single Task
      .addCase(taskAllDetails.pending, (state) => {
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
      .addCase(deleteTaskThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteTaskThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(handleUserTaskAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleUserTaskAction.fulfilled, (state, action) => {
        state.loading = false;
        console.log("running ");
      })
      .addCase(handleUserTaskAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(handleFilterTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleFilterTask.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(handleFilterTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { deleteTaskRealtime, addNewTask, updateTaskRealtime, setLoader , filterAllTask} =
  taskSlice.actions;

export default taskSlice;
