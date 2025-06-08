import { createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "../../Appwrite/Auth";

export const handleCreatUser = createAsyncThunk(
    'auth/user',

    async({data} , {rejectWithValue}) => {
         try {
            const res = await authServices.createAccount(data)
         } catch (error) {
            
         }
    }
)