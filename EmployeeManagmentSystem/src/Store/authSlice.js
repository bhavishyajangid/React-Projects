import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name : "auth" , 
    initialState: {
       currentUserDetails : [],
       isLogin : false ,
    },
    reducers : {
        login : (state , action) => {
              state.isLogin = true              
             state.currentUserDetails = action.payload
        },

        logout : (state) => {
            state.isLogin = false
            state.currentUserDetails = null
        },
        addNewTask : (state , action) => {
            state.currentUserDetails.tasks = [...state.currentUserDetails.tasks , action.payload ]
        },
        deleteTheTask : (state , action) => {
               const updatedTask  =  state.currentUserDetails.tasks.filter((task) => task.$id !== action.payload)
            
            state.currentUserDetails.tasks = updatedTask
            
        }
    }
})

export const {login , logout , addNewTask , deleteTheTask} = authSlice.actions
export default authSlice