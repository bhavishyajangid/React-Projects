import { createSlice } from "@reduxjs/toolkit";
import { editUser, handleFetchAllUser} from "./thunks/userThunk";



const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUserDetails: [],
    isLogin: false,
    isEmailExist: false,
    allEmployee: [],
    allEmployeeCount : 0,
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
    setAllEmployeeCount : (state , action) => {
       state.allEmployeeCount = action.payload
    }
  },
  extraReducers: (builder) => {
    builder

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
        state.loader = false
      })
      .addCase(editUser.rejected, (state) => {
        state.loader = false;
      })

      .addCase(handleFetchAllUser.pending , (state , action) => {
         state.loader = true
      })
      .addCase(handleFetchAllUser.fulfilled, (state , action) => {
          state.loader = false
          state.allEmployee = action.payload
      })
      .addCase(handleFetchAllUser.rejected , (state , action) => {
        state.loader = false
      })
  },
});

export const { login, logout, setAllEmployee , setAllEmployeeCount } = authSlice.actions;
export default authSlice;
