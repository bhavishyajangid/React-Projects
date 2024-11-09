import React from 'react'
import loaderpayment from '../assets/paymentloader.mp4'
const PaymentLoader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
    <video
      className="h-80 w-80"
      src={loaderpayment}
      autoPlay
      loop
      muted
    />
  </div>
  )
}

export default PaymentLoader