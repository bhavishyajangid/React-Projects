import { createSlice } from "@reduxjs/toolkit";

const chatBoxSlice = createSlice({
    name  : "chatBox",
    initialState : {
        isOpen : false,
        user : {}
    },
    reducers : {
        setChatOpen : (state , action) => {
           state.isOpen =action.payload.isOpen
           state.user = action.payload.user
        }
    }
})
export const {setChatOpen} = chatBoxSlice.actions

export default chatBoxSlice