import React, { useEffect } from 'react'
import { Cart, QuantityBtn, Tittle } from '../export'
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';

const Allcart = () => {
  // const {cartItem} = useSelector(state => state.addToCart)
  const cartItem = JSON.parse(localStorage.getItem('cartItem'))
   
  
  
  return (
    <div className='w-4/5 min-h-[70vh] max-lg:w-11/12 m-auto flex flex-col gap-5 '>
       <Tittle text1="Cart" text2="Item" para={false}/>
       
      

  {
    cartItem.products.length !== 0 ? 
    cartItem.products?.map((item) => (
      <Cart key={item.id} item={item} />
    )) :
    <p className='text-md text-gray-500 text-center'>There is no item in your cart</p>
  }
       
       

       </div>
    
  )
}

export default Allcart