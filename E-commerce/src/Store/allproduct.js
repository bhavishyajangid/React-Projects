import { createSlice } from "@reduxjs/toolkit";

const allProductsSlice = createSlice({
    name : 'allproducts' ,
    initialState : {
        allProducts : []
    },
    reducers : {
        setAllProducts : (state , action) => {
          state.allProducts = action.payload
        }
    }
})
export const {setAllProducts} = allProductsSlice.actions
export default allProductsSlice