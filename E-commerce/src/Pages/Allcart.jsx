import React, { useEffect, useState } from 'react'
import { Cart, Tittle ,Loader, CartTotal, Promo  } from '../export'
import dataBaseService from '../appwrite/cart'
import { useDispatch, useSelector } from 'react-redux'
import { addToCartItem } from '../Store/addToCart'

const Allcart = ({data}) => {
  console.log('render allcarts');
  const dispatch =useDispatch()
  const {userData} = useSelector(state => state.authSlice);
  const {cartItem , cartTotal} = useSelector(state => state.addToCart)
  const [loader , setLoader] = useState(true)

  useEffect(() => {
        
    if(userData && userData.$id){
      dataBaseService.getCarts(userData.$id)
      .then((res) => {
            dispatch(addToCartItem(res.documents))
    }).catch((error) => console.log(error)
  ).finally(() => setLoader(false))
    }

  }, [userData ])
       

  return (
    <>
    <div className='w-4/5 min-h-[70vh] m-auto flex flex-col gap-2  max-lg:w-11/12 max-sm:w-full max-sm:px-2  '>
       <Tittle text1="Cart" text2="Item" para={false}/>
      
       
  {
    loader ? (<Loader/>) : (
      cartItem.length !== 0 ? 
      (
      cartItem?.map((item , index) => (
        <Cart key={index} item={item} Id={item.Id} />
      ))) : (
      <p className='text-md text-gray-500 text-center'>There is no item in your cart</p> )
    )
}
       
<div className='w-full m-auto mt-32 max-sm:mt-20 flex  justify-between'>
      <CartTotal cartTotal={cartTotal} className='w-[40%] max-md:w-full'/>
  </div>


      
       </div>


       </>

    
  )
}

export default Allcart