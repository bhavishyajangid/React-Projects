import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'
import otpSendSlice from './otpSendSlice'
import chatBoxSlice from './chatBoxSlice'
import taskSlice from './TaskSlice'
const store = configureStore({reducer : {
      authSlice : authSlice.reducer,
      otpSendSlice : otpSendSlice.reducer,
      chatBoxSlice : chatBoxSlice.reducer,
      taskSlice : taskSlice.reducer
}})

export default store