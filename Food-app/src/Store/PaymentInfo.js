import { createSlice } from "@reduxjs/toolkit";
const paymentInfoSlice = createSlice({
    name : 'paymentInfo' , 
    initialState : {
        subTotal : 0 , 
        deliveryCharges : 0 , 
        discountPercentage : { FUTURE20: 20, TOMATO: 40 } , 
        discount : 0
    } , 
    reducers : {
        TotalPaymentCalculate : (state , action) => {
            state.subTotal = action.payload
        } , 

        addDeliveryCharges : (state , action) => {
          state.deliveryCharges = action.payload
        } , 

        addPromoCode :  ( state , action) => {
            let result  = Object.fromEntries(
                Object.entries(state.discountPercentage).filter(([key , value]) => key === action.payload)
            )
            if(result[action.payload] === undefined){
                alert("Invalid promo code")
            }else{
                state.discount = result[action.payload]
                alert("Promo code applyed")
            }
  
        }
    }
})

export const {TotalPaymentCalculate , addDeliveryCharges , addPromoCode} = paymentInfoSlice.actions
export default paymentInfoSlice