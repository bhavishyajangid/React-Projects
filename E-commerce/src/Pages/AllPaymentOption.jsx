import React from 'react'
import { PaymentOption , Tittle } from '../export'
const AllPaymentOption = () => {
  const arr = ['CARDS' , 'UPI' , 'CASH ON DELIVERY']
  return (
    <div className='w-4/5 max-sm:w-full'>
      <Tittle text1="PAYMENT " text2="METHOD" para={false} className='text-sm'/>
       <div className='flex items-center justify-evenly gap-3'>
        {
          arr.map((item) => (
           <PaymentOption key={item} item={item}/>
          ))
        }
       </div>
    </div>
  )
}

export default AllPaymentOption