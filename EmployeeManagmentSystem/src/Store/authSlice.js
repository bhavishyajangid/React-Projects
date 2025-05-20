import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dataBaseServices, { databaseServices } from "../Appwrite/Database";
import authServices from "../Appwrite/Auth";

export const deleteUser = createAsyncThunk(
    'auth/deleteUser',

    async (userId , {rejectWithValue}) => {
         try {
             const response =  await dataBaseServices.deleteUserFromDatabase(userId)
    console.log('User deleted successfully:', response);
    return response;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
         
    }
)

const authSlice = createSlice({
    name : "auth" , 
    initialState: {
       currentUserDetails : [],
       isLogin : false ,
       isEmailExist : false
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
        
        updatenewTaskValue : (state , action) => {
            state.currentUserDetails.completedTask += action.payload
        }
    },

   
    
})

  

export const {login , logout , updatenewTaskValue } = authSlice.actions
export default authSlice