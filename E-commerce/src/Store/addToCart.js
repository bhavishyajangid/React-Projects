import { createSlice } from "@reduxjs/toolkit";
import { json } from "react-router-dom";

const addToCartSlice = createSlice({
    name : 'addToCart' , 
    initialState : {
        cartItem : {products : []}, 
    },
    reducers : {
        addToCartItem : (state , action) => {
           state.cartItem = action.payload
           localStorage.setItem("cartItem" , JSON.stringify(state.cartItem))
           console.log(state.cartItem, 'cartitem' , typeof state.cartItem);
           
        }, 
    }
})
export const {addToCartItem , addToCartId} =addToCartSlice.actions
export default addToCartSlice