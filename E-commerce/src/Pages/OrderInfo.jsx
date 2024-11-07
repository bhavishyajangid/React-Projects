import React, { useCallback } from 'react'
import { CartTotal, Input, Tittle , Button, AllPaymentOption } from '../export'
import OrderForm from './OrderForm'
import { useSelector } from 'react-redux'
const OrderInfo = () => {
    const {cartItem , cartTotal} = useSelector(state => state.addToCart)

    const placeOrder = useCallback((data) => {
          console.log(data , cartItem , cartTotal);
       return ''
      } )
              
      
  return (
    <div className='w-4/5 max-lg:w-11/12 min-h-[60vh] m-auto  '>
        <Tittle text1={"Delivery"} text2={"Information"} para={false} className='text-left mt-10 text-3xl max-sm:text-center max-sm:mt-3'/> 

        <div className='w-full flex justify-between max-sm:flex-col max-sm:items-center  '>

          <OrderForm placeOrder={placeOrder}/>
          
        <div className='w-1/2 max-sm:w-full  flex flex-col items-end'>
        <CartTotal className='w-4/5 max-sm:w-full max-sm:mt-5' btn={false} cartTotal={cartTotal}/>
        </div>
        </div>
    </div>
  )
}

export default OrderInfo