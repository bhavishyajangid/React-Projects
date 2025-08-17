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
         let currentMonth = new Date().getMonth() + 1
      if (action.payload?.in) {
        state.attendenceMarkedIn = true;
        state.attendenceInData = action.payload;
        state.storedAttendence[currentMonth]?.push(action.payload)
      }

      if (action.payload?.out) {
       
         if(state.storedAttendence[currentMonth]){
          let arr  =  state.storedAttendence[currentMonth]
           arr[arr.length] = action.payload
         }
        state.attendenceMarkedOut = true;
      }


    },
    setStoredAttendence: (state, action) => {
      const { result, month } = action.payload;
      state.storedAttendence[month] = result
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
