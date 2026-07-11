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
      }).catch((error) => console.log(error))
      .finally(() => setLoader(false))
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
          <div className="w-full border border-gray-200 rounded-lg overflow-hidden mt-8 shadow-sm bg-white">
            <div className="w-full hidden sm:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-5 py-4 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
               <div>Product Details</div>
               <div>Price</div>
               <div>Quantity</div>
               <div>Total</div>
               <div className="w-8"></div>
            </div>
            <div className="flex flex-col">
              {cartItem
                .filter(Boolean) // filter out null or undefined items
                .map((item , index) => (
                  <Cart key={index} item={item} Id={item.$id} />
                ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <p className='text-lg font-medium text-gray-500 mb-4'>Your cart is currently empty</p>
          </div>
        )
      )
    }

   <div className='w-full m-auto mt-16 max-sm:mt-10 flex justify-between'>
         <CartTotal cartTotal={cartTotal} className='w-[40%] max-md:w-full'/>
   </div>



       </div>

       </>




    )
  }

  export default Allcart