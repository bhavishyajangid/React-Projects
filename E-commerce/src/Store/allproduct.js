import { createSlice } from "@reduxjs/toolkit";

const allProductsSlice = createSlice({
    name : 'allproducts' ,
    initialState : {
        allProducts : [], 
        Quantity : {},
        searchBar : false,
        filterProducts : []

    },
    reducers : {
        setAllProducts : (state , action) => {
          state.allProducts = action.payload
          state.filterProducts = action.payload
        }, 

        increaseQuantity : (state , action) => {
          const quantity = state.Quantity[action.payload] || 0;
          const updatedQuantity = {
            ...state.Quantity ,
            [action.payload] : quantity + 1
          }
          console.log(updatedQuantity , 'updatedQunatity');
          state.Quantity = updatedQuantity;
          
          
        }, 

        decreaseQunatity : (state , action) => {
            const quantity = state.Quantity[action.payload] || 1;
            const CurrentQuantity = quantity !== 1 ? quantity - 1 : 1
            const updatedQuantity = {
                ...state.Quantity ,
                [action.payload] : CurrentQuantity
              }
              console.log(updatedQuantity , 'updatedQunatity');
              state.Quantity = updatedQuantity;
        } ,

        toggleSearchBar : (state , action) => {
          state.searchBar = action.payload;
          console.log(action.payload ,'searchbar' , state.searchBar);
          
        }, 
        setFilterProducts : (state , action) => {
          console.log(action.payload);
          state.filterProducts = action.payload
        }
    }
})
export const {setAllProducts, decreaseQunatity , increaseQuantity , toggleSearchBar , setFilterProducts} = allProductsSlice.actions
export default allProductsSlice