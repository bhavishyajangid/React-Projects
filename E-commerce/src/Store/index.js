import { configureStore } from "@reduxjs/toolkit";
import allProductsSlice from "./allproduct";

const store = configureStore({reducer : {
    allProducts : allProductsSlice.reducer
}})

export default store