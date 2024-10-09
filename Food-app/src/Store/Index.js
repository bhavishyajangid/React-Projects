import addToCartSlice from "./addToCart";
import categorySlice from "./Catogries";
import ItemSlice, { addToCart } from "./Items";
import { configureStore } from '@reduxjs/toolkit'
import paymentInfoSlice from "./PaymentInfo";
import orderDeatailsSlice from "./OrdersDetails";
import orderSlice from "./orders";

const counterStore = configureStore({ reducer : {
    Items :  ItemSlice.reducer ,
    category : categorySlice.reducer , 
    addToCart : addToCartSlice.reducer , 
    paymentInfo : paymentInfoSlice.reducer,
    orderDetails : orderDeatailsSlice.reducer , 
    orders : orderSlice.reducer
}})

export default counterStore