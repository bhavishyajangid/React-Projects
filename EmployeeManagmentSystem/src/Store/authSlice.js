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
              console.log(action.payload);
              
             state.currentUserDetails = action.payload
        },

        logout : (state) => {
            state.isLogin = false
            state.currentUserDetails = null
        }
    }
})

export const {login , logout} = authSlice.actions
export default authSlice