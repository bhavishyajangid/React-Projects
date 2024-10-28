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
            state.userData = action.payload
            console.log(state.userData , 'USERDATA' , 'loading');
            
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            console.log(state.userData , 'USERDATA' , 'loading');
        }
     }
})

export const {login, logout} = authSlice.actions;

export default authSlice;