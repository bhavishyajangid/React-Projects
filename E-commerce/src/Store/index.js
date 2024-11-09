import { configureStore } from "@reduxjs/toolkit";
import allProductsSlice from "./allproduct";
import addToCartSlice from "./addToCart";
import authService from "../appwrite/auth";
import authSlice from "./authSlice";
import orderSlice from "./orders";

const store = configureStore({reducer : {
    allProducts : allProductsSlice.reducer, 
    addToCart : addToCartSlice.reducer,
    authSlice : authSlice.reducer,
    orderSlice : orderSlice.reducer
}})

export default store