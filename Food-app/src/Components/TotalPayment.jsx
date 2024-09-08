import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AllListContext } from './Context/AllListContext';

const TotalPayment = () => {
  const { addToCartItem, quantity , discount } = useContext(AllListContext);

  // Initialize state for subtotal and delivery charge
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);

  useEffect(() => {
    // Calculate subtotal
    const total = addToCartItem?.reduce((total, item) => {
      const itemQuantity = quantity[item.id] || 0; // Default to 0 if quantity is undefined
      return total + item.price * itemQuantity;
    }, 0) || 0;

    // Update subtotal state
    setSubtotal(total);

    // Update delivery charge based on subtotal
    if(total !== 0){
      setDeliveryCharge((total > 500 ) ? 0 : 50)

    }else{
      setDeliveryCharge(0)
    }
    




     
  }, [addToCartItem, quantity]); // Dependency array ensures recalculation on changes

  return (
    <div className='w-2/5 min-h-60 p-2 max-md:w-full'>
      <h1 className='text-xl capitalize font-medium'>Cart Totals</h1>
      <p className="text-gray-500 text-xs mt-1">Orders below ₹500 will incur a delivery charge of ₹50</p>
      <div className='w-full h-10 border-b border-b-gray-300 flex justify-between items-center p-1 mt-3'>
        <span className='text-md text-gray-500'>SubTotal</span>
        <span className='text-md text-gray-500'>₹ {subtotal.toFixed(2)}</span>
      </div>
      <div className='w-full h-10 border-b border-b-gray-300 flex justify-between items-center p-1'>
        <span className='text-md text-gray-500'>Delivery Fee</span>
        <span className='text-md text-gray-500'>₹ {deliveryCharge}</span>
      </div>
      
      
       <div className={`w-full h-10 border-b border-b-gray-300 flex justify-between items-center p-1 ${(discount === 0)  ? 'hidden' : 'block'} `}>
        <span className='text-md text-gray-500'>Discount <span>{discount}</span> % Off</span>
        <span className='text-md text-gray-500'>₹ {subtotal  * discount / 100}</span>
      </div>

      <div className='w-full h-10 flex justify-between items-center p-1'>
        <span className='text-md text-gray-800 font-medium'>Total</span>
        <span className='text-md text-gray-800 font-medium'>₹ {subtotal + deliveryCharge - subtotal  * discount / 100}</span>
      </div>

      <Link to="/payment">
        <button  className='w-44 h-9 font-sans font-medium mt-4 bg-orange-600 text-white text-sm rounded-md'>
          PROCESS TO CHECKOUT
        </button>
      </Link>
    </div>
  );
}

export default TotalPayment;
