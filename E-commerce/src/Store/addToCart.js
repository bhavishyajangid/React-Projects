import { createSlice } from "@reduxjs/toolkit";


const calculateTotal = (state) => {
  const subTotal = state.cartItem?.reduce((acc, curr) => {
    const itemTotal = (curr.price * curr.quantity) || 0;
    return acc + itemTotal;
  }, 0);
  
  const delivery = subTotal > 0 && subTotal < 1000 ? 200 : 0;
  
  // Apply discount
  const discountAmount = state.cartTotal?.promoApplied 
    ? Math.round(subTotal * (state.cartTotal.discountPercent / 100))
    : 0;
  
  const Total = subTotal + delivery - discountAmount;
  
  state.cartTotal = {
    subTotal: subTotal,
    delivery: delivery,
    discountPercent: state.cartTotal?.discountPercent || 0,
    discountAmount: discountAmount,
    promoApplied: state.cartTotal?.promoApplied || false,
    promoCode: state.cartTotal?.promoCode || '',
    Total: Total,
    Method: state.cartTotal?.Method || ''
  };
};

const addToCartSlice = createSlice({
    name : 'addToCart' , 
    initialState : {
        cartItem : [] , 
       cartTotal : {
         subTotal : 0,
         delivery : 0,
         discountPercent: 0,
         discountAmount: 0,
         promoApplied: false,
         promoCode: '',
         Total : 0,
         Method : ''
       }
    },
    reducers : {
        addToCartItem : (state , action) => {   
          state.cartItem = action.payload;   
          calculateTotal(state);
        },
        
        updateCartItemQuantity: (state, action) => {
          const { id, quantity } = action.payload;
          const item = state.cartItem.find(item => item.$id === id);
          if (item) {
            item.quantity = quantity;
            calculateTotal(state);
          }
        },

        applyPromo: (state, action) => {
          const { code, discountPercent } = action.payload;
          state.cartTotal.promoApplied = true;
          state.cartTotal.promoCode = code;
          state.cartTotal.discountPercent = discountPercent;
          calculateTotal(state);
        },

        removePromo: (state) => {
          state.cartTotal.promoApplied = false;
          state.cartTotal.promoCode = '';
          state.cartTotal.discountPercent = 0;
          state.cartTotal.discountAmount = 0;
          calculateTotal(state);
        },

        updateMethod : (state , action) => {
          console.log(action.payload , 'method');
            state.cartTotal.Method = action.payload
        }
    }
})
export const { addToCartItem, updateCartItemQuantity, applyPromo, removePromo, updateMethod } = addToCartSlice.actions
export default addToCartSlice