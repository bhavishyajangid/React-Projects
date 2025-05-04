import { createSlice } from "@reduxjs/toolkit";
import dataBaseServices from "../Appwrite/Database";


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
        isEmailAlreadyInUse : (state , action) => {
            try {
        
                const verifyEmailExist = dataBaseServices.emailIsExists(action.payload) 
        
                console.log(verifyEmailExist);
                
                if(verifyEmailExist){
                    state.isEmailExist = verifyEmailExist
                }
        
               } catch (error) {
                   console.log(error , "when the reponse is coming in the email check");  
               }
        }
    }
})

  

export const {login , logout } = authSlice.actions
export default authSlice