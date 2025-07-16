import { createSlice } from "@reduxjs/toolkit";
import { handleAddLeave } from "./thunks/leaveThunk";
const leaveSlice = createSlice({
    name : "leave" ,
    initialState : {
        allLeave : [],
        loader : false,
        error : '',
        leaveByEmployee : {
            employeeId : []
        }
    },
reducers : {
   setLeaveByEmployee : (state , action) => {
    const {empId , leaves} = action.payload
    state.leaveByEmployee[empId] = leaves
    state.allLeave = leaves
    state.loader = false
   },
   setAllLeave : (state , action) => {
     state.allLeave = action.payload
     state.loader = false
   },
   setLoader : (state , action) => {
     state.loader = action.payload
   }
},
   
    extraReducers : (builder) => {
        builder 

        .addCase(handleAddLeave.pending , (state) => {
           state.loader = true
        })
        .addCase(handleAddLeave.fulfilled , (state , action) => {
            state.loader = false
            console.log(action.payload , 'patlo');
            
           state.allLeave.push(action.payload)
        })
        .addCase(handleAddLeave.rejected , (state , action) => {
            state.loader = false
            state.error = action.payload
        })
    }

})

export const {setLeaveByEmployee , setLoader , setAllLeave} = leaveSlice.actions
export default leaveSlice