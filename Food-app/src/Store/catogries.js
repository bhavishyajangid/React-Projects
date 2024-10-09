import { createSlice } from "@reduxjs/toolkit";
import FoodData, { AllCatogries } from "../FoodData/FoodData";

const categorySlice = createSlice({
  name : 'category' , 
  initialState : {
    category : AllCatogries , 
    FoodData , 
    filterData : FoodData
  } , 
  reducers : {
    filterCategory : (state, actions) => {
     state.filterData = actions.payload  !== "All"  ?  state.FoodData.filter((item) => item.category === actions.payload) : state.FoodData    
    }
  }
})

export const {filterCategory} = categorySlice.actions
export default categorySlice