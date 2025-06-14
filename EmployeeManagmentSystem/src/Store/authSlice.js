import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authServices from "../Appwrite/Auth";
import dataBaseServices from "../Appwrite/Database";

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

export const handleCreateAccount = createAsyncThunk(
  "auth/user",
  async (data, { rejectWithValue }) => {
    const verifyEmailExist = await dataBaseServices.emailIsExists(data.email);
    if (verifyEmailExist) {
      return rejectWithValue("Email Already In Use !! Try Another Email");
    }
    try {
      let user = await authServices.createAccount(data);
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUserDetails: [],
    isLogin: false,
    isEmailExist: false,
    allEmployee: [],
    loader: false,
  },
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.currentUserDetails = action.payload;
    },

    logout: (state) => {
      state.isLogin = false;
      state.currentUserDetails = null;
    },

    setAllEmployee: (state, action) => {
      state.allEmployee = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(handleCreateAccount.pending, (state) => {
        state.loader = true
      })
      .addCase(handleCreateAccount.fulfilled, (state, action) => {
        if (state.currentUserDetails?.admin) {
          state.allEmployee.push(action.payload);
        }
      })
      .addCase(handleCreateAccount.rejected, (state) => {
        state.loader = false;
      });
  },
});

export const { login, logout, setAllEmployee } = authSlice.actions;
export default authSlice;
