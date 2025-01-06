import { createSlice } from "@reduxjs/toolkit";


const adminSlice =createSlice({
    name: 'admin',
    initialState : {
        adminTask : []
    },
    reducers : {
        addTaskSetByAdmin : (state, action) => {
            state.adminTask = [action.payload , ...state.adminTask]
        }
    }
})

export const {addTaskSetByAdmin} = adminSlice.actions
export default adminSlice