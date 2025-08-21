import { createSlice, current } from "@reduxjs/toolkit";

const attendenceSlice = createSlice({
  name: "attendence",
  initialState: {
    attendenceMarkedIn: false,
    attendenceMarkedOut: false,
    attendenceInData: {},
    allAttendence: [],
    loader: true,
    storedAttendence: {},
    firstRender: true,
    total: {
    halfDayLeave: 0,
      fullDayLeave: 0,
      totalLeave: 0,
      halfDayAttendence: 0,
      fullDayAttendence: 0,
      totalAttendence: 0,
      forgetToMarkeAttendence: 0,
      overTime: 0,
    },
  },
  reducers: {
    setAttendenceMarkedIn: (state, action) => {
      state.attendenceMarkedIn = true;
      state.attendenceInData = action.payload;
    },

    setAttendenceMarkedOut: (state, action) => {
      const { date, attendence } = action.payload;
      let month = new Date().getMonth() + 1;
      console.log(state.storedAttendence[month][date]);

      if (state.storedAttendence[month][date]) {
        state.storedAttendence[month][date] = attendence;
      }
      state.attendenceMarkedOut = true;
    },

    setAttendence: (state, action) => {
      state.firstRender = false;
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
      state.loader = false;
    },
    setAllAttendence: (state, action) => {
      state.allAttendence = action.payload;
      state.loader = false;
    },
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
    setTotal: (state, action) => {
      const type = action.payload;

      if (type === "halfDayLeave") {
        state.total.halfDayLeave += 1;
        state.total.totalLeave += 0.5;

      } else if (type === "fullDayLeave") {
        state.total.fullDayLeave += 1;
        state.total.totalLeave += 1;

      } else if (type === "forgetToMarked") {
        state.total.forgetToMarkeAttendence += 1;
        state.total.totalAttendence += 1;

      } else if (type === "halfDayAtt") {
        state.total.halfDayAttendence += 1;
        state.total.totalAttendence += 0.5;

      } else if (type === "fullDayAtt") {
        state.total.fullDayAttendence += 1;
        state.total.totalAttendence += 1;

      } else if (type?.overtimeHours !== undefined) {
        // ✅ Overtime logic
        let overtime = type.overtimeHours - 8; // remove normal 8h

        if (overtime >= 8) {
          state.total.fullDayAttendence += 1;
          state.total.totalAttendence += 1;
        } else if (overtime > 4) {
          state.total.halfDayAttendence += 1;
          state.total.totalAttendence += 0.5;
        }

        // Track raw overtime also
        state.total.overTime += overtime > 0 ? overtime : 0;
      }
    },
    resetTotal: (state) => {
      state.total = {
        halfDayLeave: 0,
        fullDayLeave: 0,
        totalLeave: 0,
        halfDayAttendence: 0,
        fullDayAttendence: 0,
        totalAttendence: 0,
        forgetToMarkeAttendence: 0,
        overTime: 0,
      };
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
  setTotal,
} = attendenceSlice.actions;
export default attendenceSlice;
