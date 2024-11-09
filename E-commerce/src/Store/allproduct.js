import { createSlice } from "@reduxjs/toolkit";

const allProductsSlice = createSlice({
    name : 'allproducts' ,
    initialState : {
        allProducts : [], 
        Quantity : {},
        searchBar : false,
        filterProducts : [],
        sortedArray : 'rel'

    },
    reducers : {
        setAllProducts : (state , action) => {
          state.allProducts = action.payload
          state.filterProducts = action.payload
        }, 

        increaseQuantity : (state , action) => {
          const quantity = state.Quantity[action.payload] || 1;
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
          if(state.sortedArray === 'asc') {
            state.filterProducts =  [...action.payload].sort((a , b) => a.price - b.price)
          }else if(state.sortedArray === 'desc'){
            state.filterProducts =  [...action.payload].sort((a , b) => b.price - a.price)
          }else{
            state.filterProducts = action.payload
          }

        }, 
        setSortedArray : (state , action) => {
           state.sortedArray = action.payload
           
           
           if(action.payload === 'asc'){
            let data =  [...state.filterProducts].sort((a , b) => a.price - b.price)
            state.filterProducts = data
     
             }else if(action.payload === 'desc') {
               let data =  [...state.filterProducts].sort((a , b) => b.price - a.price)
            state.filterProducts = data
             }else{
               state.filterProducts = state.allProducts

             }
        }, 
        FilterSearchItem : (state , action) => {
            state.filterProducts = state.allProducts.filter((item) => item.title.toUpperCase().includes(action.payload.toUpperCase()) === true)
                  
      }
    }
})
export const {setAllProducts, decreaseQunatity , increaseQuantity , toggleSearchBar , setFilterProducts , setSortedArray , FilterSearchItem} = allProductsSlice.actions
export default allProductsSlice