import { configureStore } from "@reduxjs/toolkit";
import navbarSlice from "./NavbarSlice";


const store = configureStore({reducer : {
    navbarSlice : navbarSlice.reducer
}})

export default store