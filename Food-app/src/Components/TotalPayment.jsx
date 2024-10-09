import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addDeliveryCharges } from '../Store/PaymentInfo';

const TotalPayment = ({visible}) => {
  const {Quantity , itemsInCart} = useSelector(state => state.addToCart)
  const {FoodData} = useSelector(state => state.Items)
  const {subTotal , deliveryCharges , discount} = useSelector(state => state.paymentInfo)
  const Dispatch = useDispatch()
  
  useEffect(() => {
    // Update delivery charge based on subtotal
    if(subTotal >  500  || subTotal === 0){
      Dispatch(addDeliveryCharges(0))
    }else{
      Dispatch(addDeliveryCharges(50))
    } 
  }, [subTotal, Quantity]); // Dependency array ensures recalculation on changes

  return (
    <div className='w-2/5 min-h-60 p-2 max-md:w-full'>
      <h1 className='text-xl capitalize font-medium'>Cart Totals</h1>
      <p className="text-gray-500 text-xs mt-1">Orders below ₹500 will incur a delivery charge of ₹50</p>
      <div className='w-full h-10 border-b border-b-gray-300 flex justify-between items-center p-1 mt-3'>
        <span className='text-md text-gray-500'>SubTotal</span>
        <span className='text-md text-gray-500'>₹ {subTotal}</span>
      </div>
      <div className='w-full h-10 border-b border-b-gray-300 flex justify-between items-center p-1'>
        <span className='text-md text-gray-500'>Delivery Fee</span>
        <span className='text-md text-gray-500'>₹ {deliveryCharges}</span>
      </div>
      
      
       <div className={`w-full h-10 border-b border-b-gray-300 flex justify-between items-center p-1 ${(discount === 0)  ? 'hidden' : 'block'} `}>
        <span className='text-md text-gray-500'>Discount <span>{discount}</span> % Off</span>
        <span className='text-md text-gray-500'>₹ {subTotal  * discount / 100}</span>
      </div>

      <div className='w-full h-10 flex justify-between items-center p-1'>
        <span className='text-md text-gray-800 font-medium'>Total</span>
        <span className='text-md text-gray-800 font-medium'>₹ {subTotal + deliveryCharges - subTotal  * discount / 100}</span>
      </div>

      <Link to="/payment">
        <button  className={`w-44 h-9 font-sans font-medium mt-4 bg-orange-600 text-white text-sm rounded-md ${visible === 'none' ? 'hidden'  : 'block'} ${(itemsInCart.length === 0) ? "hidden" : 'block' }`}>
          PROCESS TO CHECKOUT
        </button>
      </Link>
    </div>
  );
}

export default TotalPayment;
