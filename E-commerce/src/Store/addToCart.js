import { createSlice } from "@reduxjs/toolkit";


const addToCartSlice = createSlice({
    name : 'addToCart' , 
    initialState : {
        cartItem : [] , 
       cartTotal : {
         subTotal : 0,
         delivery : 0,
         Total : 0,
         Method : 'CASH ON DELIVERY'
       }
    },
    reducers : {
        addToCartItem : (state , action) => {   
          state.cartItem = action.payload   

          const subTotal = state.cartItem?.reduce((acc, curr) => {
            return acc + curr.Total;
          }, 0);
          
          const delivery = subTotal > 500 ? 0 : 10
          const Total = subTotal + delivery
          state.cartTotal = {
             subTotal : subTotal ,
             delivery : delivery,
             Total : Total,
             Method : 'cod'
             }
                
        },

        updateMethod : (state , action) => {
            state.cartTotal.Method = action.payload
        }
        
       
        


    


        
    }
})
export const {addToCartItem ,updateMethod} =addToCartSlice.actions
export default addToCartSlice