import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name : 'auth' , 
    initialState : {
        status : false , 
        userData : null
    }, 
    reducers : {
        Login : (state , action) => {
            state.status = true
            state.userData = action.payload.userData
        }, 

        Logout : (state) => {
            state.status = false
            state.userData = null
        }, 
    }
})
export const {Login , Logout} = authSlice.actions
export default authSlice