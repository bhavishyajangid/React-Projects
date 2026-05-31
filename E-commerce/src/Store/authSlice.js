import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: {},
    
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            let updatedData = state.userData

            if(state.userData?.labels.includes("admin")){
                 updatedData = {
                    ...updatedData,
                    isAdmin : true
                 }
            }
            
            state.userData = updatedData
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            
        }
     }
})

export const {login, logout} = authSlice.actions;

export default authSlice;