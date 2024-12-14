import { configureStore } from "@reduxjs/toolkit"
import profileListSlice from "./profileList"

const store = configureStore({reducer : {
    profileList : profileListSlice.reducer
}})

export default store