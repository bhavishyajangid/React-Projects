import { createSlice } from "@reduxjs/toolkit";


const addToCartSlice = createSlice({
    name : 'addToCart' ,
    initialState : {
        Quantity : {}, 
        itemsInCart : [] , 
    } ,
    reducers : {

        increment : (state , action) => {
             const currentQuantity = state.Quantity[action.payload] || 0; // Get current quantity for item id
             const newQuantity = currentQuantity + 1; // Increment quantity
             // Update the quantity state with new quantity for item id
              const updatedState = {
                ...state.Quantity,
                [action.payload]: newQuantity,
             };
               state.Quantity = updatedState;
        }, 

        decrement : (state , action) => {
            const currentQuantity = state.Quantity[action.payload] || 0; // Get current quantity for item id
            const newQuantity =
              currentQuantity === 0 ? currentQuantity : currentQuantity - 1; // Decrement quantity
      
            // Update the quantity state with new quantity for item id
              const updatedState = {
                ...state.Quantity,
                [action.payload]: newQuantity,
              };
              state.Quantity =  Object.fromEntries(
                Object.entries(updatedState).filter(([key, value]) => value !== 0)
              );

            
        } ,

        addItemInCart : (state , action) => {
        state.itemsInCart = action.payload
        console.log('running');
        
        

        },
      
        removeItem : (state , action) => {
              state.Quantity = Object.fromEntries(
                 Object.entries(state.Quantity).filter(([key, value]) => key !== String(action.payload))
              )
              
        } , 

      
    }
})

export const {increment , decrement , removeItem , addItemInCart} = addToCartSlice.actions
export default addToCartSlice