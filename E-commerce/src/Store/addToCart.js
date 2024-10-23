import { createSlice } from "@reduxjs/toolkit";

const addToCartSlice = createSlice({
    name : 'addToCart' , 
    initialState : {
        cartItem : {products : []}, 
    },
    reducers : {
        addToCartItem : (state , action) => {
           state.cartItem = action.payload
           console.log(state.cartItem, 'cartitem' , typeof state.cartItem);
           
        }, 
    }
})
export const {addToCartItem , addToCartId} =addToCartSlice.actions
export default addToCartSlice