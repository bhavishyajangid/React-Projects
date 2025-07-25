import { createSlice, current } from "@reduxjs/toolkit";
import LeaveServices from "../Appwrite/Leave";
import { createAsyncThunk } from "@reduxjs/toolkit";
import setStoreLeaveInObj from "../utlity/storeLeaveinobj";
import updateLeaveInArray from "../utlity/updateLeaveInArray";

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
    storedLeaves: {},
    prevEmpId: "",
    firstRender: true,
  },
  reducers: {
    setStoreLeaves: (state, action) => {
      console.log("leaves set in the obj and allleaves");
      const { empId, leaves , isAdminPage } = action.payload;
       if(isAdminPage){
         state.storedLeaves =  setStoreLeaveInObj(leaves)
         state.allLeave =  Object.values(state.storedLeaves).flat()
       }else{
         state.storedLeaves[empId] = leaves;
         state.allLeave = leaves;
       }
       state.prevEmpId = empId
       state.loader = false
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
    addRealTimeLeave: (state, action) => {
      const { empId, leave } = action.payload;
      console.log(empId, leave, "idleave");

      console.log("leaves set by real time ");

      if(!state.storedLeaves[empId]){
         state.storedLeaves[empId] = [leave];
      }

      if(state.storedLeaves[empId]){
         state.storedLeaves[empId].push(leave);
      }

      state.allLeave.push(leave)

      
     
    },


updateLeaveRealTime: (state, action) => {
  const leave = action.payload;

  // ✅ Only use current() for debugging/logging
  console.log("Before Update:");
  console.log("All Leave:", current(state.allLeave));
  console.log("Stored Leaves:", current(state.storedLeaves[leave.employeeId]));
  console.log("Incoming Leave:", leave);

  // 🟡 Safe to mutate the state directly
  if (state.storedLeaves[leave.employeeId]) {
    const index = state.storedLeaves[leave.employeeId].findIndex(
      (item) => item.$id === leave.$id
    );

    if (index !== -1) {
      state.storedLeaves[leave.employeeId][index] = leave;
    }
  }

  const index = state.allLeave.findIndex((item) => item.$id === leave.$id);
  if (index !== -1) {
    state.allLeave[index] = leave;
  }

  // ✅ Log updated state without proxy
  console.log("After Update:");
  console.log("All Leave:", current(state.allLeave));
  console.log("Stored Leaves:", current(state.storedLeaves));
}


   

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
  setStoreLeaves,
 updateLeaveRealTime,
  addRealTimeLeave,
  setLoader,
  setAllLeave,
} = leaveSlice.actions;
export default leaveSlice;
