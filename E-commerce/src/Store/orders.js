import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name : " orders" , 
    initialState : {
        allOrders : [],
        userDetais : {}
    }, 
    reducers : {
        setAllOrders : (state , action) => {
         state.allOrders = action.payload
         
        },
        setUserDetails : (state , action) => {
             state.userDetais = action.payload
        }
        
    }
})

export const {setAllOrders , setUserDetails} = orderSlice.actions
export default orderSlice