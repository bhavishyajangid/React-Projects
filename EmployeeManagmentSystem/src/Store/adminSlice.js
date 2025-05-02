import { createSlice } from "@reduxjs/toolkit";


const adminSlice =createSlice({
    name: 'admin',
    initialState : {
        adminTask : [],
    },
    reducers : {
        addTaskSetByAdmin : (state, action) => {
            state.adminTask = action.payload
        },
       addNewTask : (state , action) => {
        state.adminTask = [action.payload , ...state.adminTask]
       } , 

       updateTask : (state , action) => {
         const index = state.adminTask.findIndex(task => task.$id === action.payload.$id)

         if(index !== -1 ){
            state.adminTask[index] = action.payload
         }
       },

       deleteTask : (state , action) => {
           state.adminTask = state.adminTask.filter(task => task.$id !== action.payload.$id)
       }

    
    }
})

export const {addTaskSetByAdmin , addNewTask ,updateTask , deleteTask} = adminSlice.actions
export default adminSlice