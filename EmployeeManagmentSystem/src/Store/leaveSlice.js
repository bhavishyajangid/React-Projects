import { createSlice, current } from "@reduxjs/toolkit";
import LeaveServices from "../Appwrite/Leave";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const handleAddLeave = createAsyncThunk(
  "leave/addLeave",
  async (data, { rejectWithValue }) => {
    try {
      const result = await LeaveServices.addLeave(data);
      return result;
    } catch (error) {
      return rejectWithValue(error.message); // ✅ correct spelling
    }
  }
);

const leaveSlice = createSlice({
  name: "leave",
  initialState: {
    allLeave: [],
    loader: false,
    error: "",
    leaveByEmployee: {},
    prevEmpId: "",
  },
  reducers: {
    setLeaveByEmployee: (state, action) => {
      console.log("leaves set in the obj and allleaves");

      const { empId, leaves } = action.payload;
      state.prevEmpId = empId;
      state.leaveByEmployee[empId] = leaves;
      state.allLeave = leaves;
      state.loader = false;
    },
    setAllLeave: (state, action) => {
      const { empId, leaves } = action.payload;
      console.log("leave set in the allleaves");

      state.allLeave = leaves;
      state.prevEmpId = empId;
      state.loader = false;
    },
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
    setRealTimeLeave: (state, action) => {
      const { empId, leave } = action.payload;
      console.log(empId, leave, "idleave");

      console.log("leaves set by real time ");

      if (state.leaveByEmployee[empId]) {
        state.leaveByEmployee[empId].push(leave);
      }
      state.allLeave.push(leave);
      if (state.leaveByEmployee[123]) {
        state.leaveByEmployee[123].push(leave);
      }
    },

   

  },

  extraReducers: (builder) => {
    builder

      .addCase(handleAddLeave.pending, (state) => {
        state.loader = true;
      })
      .addCase(handleAddLeave.fulfilled, (state, action) => {
        state.loader = false;
      })
      .addCase(handleAddLeave.rejected, (state, action) => {
        state.loader = false;
        state.error = action.payload;
      });
  },
});

export const {
  setLeaveByEmployee,
  setUpdateLeaveRealTime,
  setRealTimeLeave,
  setLoader,
  setAllLeave,
} = leaveSlice.actions;
export default leaveSlice;
