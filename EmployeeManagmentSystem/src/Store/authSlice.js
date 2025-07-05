import { createSlice } from "@reduxjs/toolkit";
import { editUser } from "./thunks/userThunk";
import { handleCreateAccount } from "./thunks/userThunk";

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
        state.loader = true;
      })
      .addCase(handleCreateAccount.fulfilled, (state, action) => {
        if (state.currentUserDetails?.admin) {
          state.allEmployee.push(action.payload);
        }
      })
      .addCase(handleCreateAccount.rejected, (state) => {
        state.loader = false;
      })

      .addCase(editUser.pending, (state) => {
        state.loader = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const index = state.allEmployee.findIndex(
          (user) => user.$id === action.payload.$id
        );
        if (index !== -1) {
          state.allEmployee[index] = action.payload; // Correctly replace the old object
        }
      })
      .addCase(editUser.rejected, (state) => {
        state.loader = false;
      });
  },
});

export const { login, logout, setAllEmployee } = authSlice.actions;
export default authSlice;
