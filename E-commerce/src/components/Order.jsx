import React from 'react'

const Order = ({order}) => {
  return (
    <div class="py-2 border-t border-b text-gray-700 flex  flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div class="flex items-start gap-6 text-sm">
        <img class="w-16 sm:w-20" src={order.Image} alt="" />
        <div>
          <p class="sm:text-base font-medium">{order.Tittle}</p>
          <div class="flex items-center gap-3 mt-1 text-base text-gray-700">
            <p>Price : ${order.Price}</p>
            <p>Quantity: {order.Quantity}</p>
            </div>
            <p class="mt-1">Date: <span class=" text-gray-400">{order.Date}</span></p>
            <p class="mt-1">Payment: <span class=" text-gray-400">{order.Method}</span></p>
            </div>
            </div>
            <div class="md:w-1/2 flex justify-between">
            <div class="flex items-center gap-2">
              <p class="min-w-2 h-2 rounded-full bg-green-500"></p>
              <p class="text-sm md:text-base">{order.Status}</p>
              </div>
              <button class="border px-4 py-2 text-sm font-medium rounded-sm">Track Order</button>
              </div>
              </div>
  )
}

export default Order