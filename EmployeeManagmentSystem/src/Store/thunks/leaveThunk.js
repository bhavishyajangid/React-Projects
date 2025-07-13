import { createAsyncThunk } from "@reduxjs/toolkit";
import dataBaseServices from "../../Appwrite/Database";

export const handleAddLeave = createAsyncThunk(
  'leave/addLeave',
  async (data, { rejectWithValue }) => {
    try {
      const result = await dataBaseServices.addLeave(data);
      return result;
    } catch (error) {
      return rejectWithValue(error.message); // ✅ correct spelling
    }
  }
);
