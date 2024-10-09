import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name : "orders" , 
    initialState : {
        orderedItem : [] , 
        orderQuantity : [] ,
        status : 'Food Processing'
    } , 
    reducers : {
        handleOrderedItems : (state , action) => {
            Object.entries(action.payload.Quantity).forEach(([key , value]) => {
                let data = {
                    key : key , 
                    value : value ,
                    status : state.status
                }

               state.orderQuantity = [...state.orderQuantity , data]
            })
            
            //   console.log(state.orderQuantity , 'quantity');


              const result = state.orderQuantity.map((item) => {
               return action.payload.FoodData.filter((item2) => item2.id == item['key'])
              }).flat()

              state.orderedItem = result
            //   console.log(state.orderedItem , 'item');    
        } ,  

        handleOrderCancel : (state , action) => {
            state.orderQuantity[action.payload].status = "Cancelled"
        }
    }
})
export const {handleOrderedItems , handleOrderCancel} = orderSlice.actions
export default orderSlice