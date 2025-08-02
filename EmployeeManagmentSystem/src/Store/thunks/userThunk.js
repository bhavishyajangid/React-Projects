import { createAsyncThunk } from "@reduxjs/toolkit";
import dataBaseServices, { databaseServices } from "../../Appwrite/Database";


 export const editUser = createAsyncThunk(
    'employee/edituser',

    async({userId , data }, {rejectWithValue}) => {
       
        
        try {
            const user = await dataBaseServices.editUser(userId , data)
            return user
        } catch (error) {
          return rejectWithValue(error.message || "Failed to update user");
        }
    }
)



export const deleteUser = createAsyncThunk(
  "auth/deleteUser",

  async (userId, { rejectWithValue }) => {
    try {
      const response = await dataBaseServices.deleteUserFromDatabase(userId);
      console.log("User deleted successfully:", response);
      return response;
    } catch (error) {
      console.error("Error deleting user:", error);
      return rejectWithValue(error);
    }
  }
);

export const handleFetchAllUser = createAsyncThunk(
  'alluser',

  async(_ , {rejectWithValue}) => {
     try {
      const employee = await dataBaseServices.getAllUser()
      return employee.documents 
     } catch (error) {
       return rejectWithValue(error)
     }
  }
)