import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'
import adminSlice from './adminSlice'
const store = configureStore({reducer : {
      authSlice : authSlice.reducer,
      adminSlice : adminSlice.reducer
}})

export default store