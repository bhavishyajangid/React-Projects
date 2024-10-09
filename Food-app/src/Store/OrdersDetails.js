import { createSlice } from "@reduxjs/toolkit";

const orderDeatailsSlice = createSlice({
    name : 'orderDetails' , 
    initialState : {
        orderDetails : {} , 
        paymentDone : false
    }, 
    reducers : {
        getOrderDetails(state , action) {
         state.orderDetails = action.payload 
             
        } , 
        paymentDone : (state, action) => {
          state.paymentDone = action.payload
          
        }
    }
})
export const {getOrderDetails , paymentDone} = orderDeatailsSlice.actions
export default orderDeatailsSlice