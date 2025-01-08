import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'
import adminSlice from './adminSlice'
import otpSendSlice from './otpSendSlice'
const store = configureStore({reducer : {
      authSlice : authSlice.reducer,
      adminSlice : adminSlice.reducer,
      otpSendSlice : otpSendSlice.reducer
}})

export default store