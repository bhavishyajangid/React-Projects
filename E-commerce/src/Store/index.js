import { configureStore } from "@reduxjs/toolkit";
import allProductsSlice from "./allproduct";
import addToCartSlice from "./addToCart";

const store = configureStore({reducer : {
    allProducts : allProductsSlice.reducer, 
    addToCart : addToCartSlice.reducer,
}})

export default store