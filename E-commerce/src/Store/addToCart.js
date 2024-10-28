import { createSlice } from "@reduxjs/toolkit";


const addToCartSlice = createSlice({
    name : 'addToCart' , 
    initialState : {
        cartItem : [] , 
        cartBtn : false ,
        deleteItem : false ,
    },
    reducers : {
        addToCartItem : (state , action) => {   
          state.cartItem = action.payload   
          console.log(action.payload , 'cart');
                
        }, 
        cartBtnClick : (state , action) => {
            state.cartBtn = action.payload  
        },


    


        
    }
})
export const {addToCartItem , addToCartId , cartBtnClick , deleteItem} =addToCartSlice.actions
export default addToCartSlice