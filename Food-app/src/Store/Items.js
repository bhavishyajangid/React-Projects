import { createSlice } from "@reduxjs/toolkit";
import FoodData from "../FoodData/FoodData";

const ItemSlice = createSlice({
    name : 'items' , 
    initialState : {FoodData} ,
    reducers : {
        
    } 
})

export const {addToCart} = ItemSlice.actions
export default ItemSlice;