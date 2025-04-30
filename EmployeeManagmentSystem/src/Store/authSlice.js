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
        addNewTask : (state , action) => {
            state.currentUserDetails.tasks = [...state.currentUserDetails.tasks , action.payload ]
        },
        deleteTheTask : (state , action) => {
               const updatedTask  =  state.currentUserDetails.tasks.filter((task) => task.$id !== action.payload)
            
            state.currentUserDetails.tasks = updatedTask
            
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

  

export const {login , logout , addNewTask , deleteTheTask} = authSlice.actions
export default authSlice