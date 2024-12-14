import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name : "auth" , 
    initialState: {
       currentUserDetails : [],
       isAuth : false ,
    },
    reducers : {
        login : (state , action) => {
              state.isAuth = true
             state.currentUserDetails = action.payload
        },

        logout : (state) => {
            state.isAuth = false
            state.currentUserDetails = null
        }
    }
})

export const {login , logout} = authSlice.actions
export default authSlice