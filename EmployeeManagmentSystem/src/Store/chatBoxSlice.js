import { createSlice } from "@reduxjs/toolkit";

const chatBoxSlice = createSlice({
    name  : "chatBox",
    initialState : {
        isOpen : false,
        user : {} , 
        unseenMessage : {
            for : "" , 
            message : [],
            Count : 0
        },
        fetched : true,
       
    },
    reducers : {
        setChatOpen : (state , action) => {
           state.isOpen =action.payload.isOpen
           state.user = action.payload.user
        }, 

        increamentUnseenCount : (state , action) => {
            
            
                console.log(action.payload , 'action.payload to increament');
                state.unseenCount = action.payload
            
             
        },
         decrementUnseenCount : (state) => {
             state.unseenCount = state.unseenCount -=  1 
        },
        setUnseenMessage : (state, action) => {
            
            state.unseenMessage.message = action.payload
             state.unseenMessage.Count = action.payload.length | 0
             state.unseenMessage.for = action.payload.receiverId | ""
        },

        setFetched : (state , action) => {
             state.fetched = action.payload
        },

        addUnseenMessage: (state, action) => {
            console.log(action.payload);
            
            state.unseenMessage.message = [...state.unseenMessage.message, action.payload];
            state.unseenMessage.Count += 1;
            state.unseenMessage.for = action.payload.receiverId | ""
            console.log(state.unseenMessage , 'unseenmessage');
            
          },
       

    }
})
export const {setChatOpen , increamentUnseenCount , setUnseenMessage , setFetched , decrementUnseenCount , addUnseenMessage} = chatBoxSlice.actions

export default chatBoxSlice