import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateMethod } from '../Store/addToCart'

const PaymentOption = ({item}) => {
  const {cartTotal } = useSelector(state => state.addToCart)
  const dispatch = useDispatch()

    const handleBtn = () => {
          dispatch(updateMethod(item))
    }

  return (
    <div onClick={handleBtn} className={`h-10 min-w-28 px-2 cursor-pointer text-sm flex items-center justify-center  gap-3 border border-solid border-gray-300 `}>
    <span className={`min-w-3.5 h-3.5 border border-solid border-gray-500 rounded-full ${cartTotal.Method == item ? 'bg-green-400' : 'bg-transparent'}`}></span>
    <span>{item}</span>
    </div>
  )
}

export default PaymentOption