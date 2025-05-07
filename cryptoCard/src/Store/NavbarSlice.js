import { createSlice } from "@reduxjs/toolkit";
import Navbar from "../components/Navbar";

const navbarSlice = createSlice({
    name : "sidebar", 
    initialState : {
        isOpen : false
    }, 
    reducers : {
        setIsOpen : (state , action) => {
             state.isOpen = !state.isOpen
        }
    }
})

export const {setIsOpen} = navbarSlice.actions

export default navbarSlice