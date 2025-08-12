import { createSlice } from "@reduxjs/toolkit";

const attendenceSlice = createSlice({
  name: "attendence",
  initialState: {
    attendenceMarkedIn: false,
    attendenceMarkedOut: false,
    attendenceInData: {},
    allAttendence: [],
    loader: true,
    storedAttendence: {},
    firstRender : true
  },
  reducers: {
    setAttendenceMarkedIn: (state, action) => {
      state.attendenceMarkedIn = action.payload;
    },
    setAttendenceMarkedOut: (state, action) => {
      state.attendenceMarkedOut = action.payload;
    },
    setAttendence: (state, action) => {
        state.firstRender = false
      if (action.payload?.in) {
        state.attendenceMarkedIn = true;
        state.attendenceInData = action.payload;
      }

      if (action.payload?.out) {
        state.attendenceMarkedOut = true;
      }
    },
    setStoredAttendence: (state, action) => {
      const { result, month } = action.payload;
        state.storedAttendence[month] = result;
        state.allAttendence = result;
        state.loader = false
      
    },
    setAllAttendence: (state, action) => {
      state.allAttendence = action.payload;
      state.loader = false;
    },
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
  },
});

export const {
  setAttendenceMarkedIn,
  setStoredAttendence,
  setAllAttendence,
  setLoader,
  setAttendence,
  setAttendenceMarkedOut,
} = attendenceSlice.actions;
export default attendenceSlice;
