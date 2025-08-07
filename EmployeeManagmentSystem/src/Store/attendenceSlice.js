import { createSlice } from "@reduxjs/toolkit";

const attendenceSlice = createSlice({
    name : 'attendence',
    initialState : {
        attendenceMarkedIn : false,
        attendenceMarkedOut : false,
        attendenceInData : {}
    },
    reducers : {
        setAttendenceMarkedIn : (state, action) => {
             state.attendenceMarkedIn = action.payload 
        },
        setAttendenceMarkedOut : (state , action) => {
             state.attendenceMarkedOut = action.payload
        },
        setAttendence : (state , action) => {
             if(action.payload?.in){
                state.attendenceMarkedIn = true
                 state.attendenceInData = action.payload
             }

             if(action.payload?.out){
                state.attendenceMarkedOut = true
             }
        }
    }
})

 export const {setAttendenceMarkedIn , setAttendence , setAttendenceMarkedOut} = attendenceSlice.actions
 export default attendenceSlice