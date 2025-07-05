import { createAsyncThunk } from "@reduxjs/toolkit";
import dataBaseServices from "../../Appwrite/Database";

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

export const handleCreateAccount = createAsyncThunk(
  "auth/user",
  async (data , currentUser, { rejectWithValue }) => {
    const verifyEmailExist = await dataBaseServices.emailIsExists(data.email);
    if (verifyEmailExist) {
      return rejectWithValue("Email Already In Use !! Try Another Email");
    }
    try {
      let user = await authServices.createAccount(data , currentUser);
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

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