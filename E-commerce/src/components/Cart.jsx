import React, { memo, useEffect, useState } from 'react'
import { Loader } from '../export'
import { MdDelete } from "react-icons/md";
import dataBaseService from '../appwrite/cart';
import {toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { addToCartItem } from '../Store/addToCart';
const Cart = ({item , Id}) => {
  const dispatch = useDispatch();
   const {userData} = useSelector(state =>  state.authSlice)
   const [loader , setLoader] = useState(false);
  const [updatedValueInCart , setUpdatedValueInCart] = useState(
    {
      updatedQuantity : item.Quantity, 
      updatedTotal : item.Total

  })



  const handleQuantity = (Quantity) => {
       const total = Quantity * Number(item.Price)
       dataBaseService.updateCart(
        {  
          Quantity : Number(Quantity) , 
          Total : Number(total),
          Id : Id
        }
        ) 
        .then((response) => {
          if(response){
            setUpdatedValueInCart({updatedQuantity : response.Quantity  , updatedTotal : response.Total })
          }
        })
        
       
  }
  const deleteItem = () => {
    setLoader(true)
    dataBaseService.deleteCart(Id)
    .then((res) => {
      if(res){
          dataBaseService.getCarts(userData.$id)
          .then((res) => {
                dispatch(addToCartItem(res.documents));
          }).catch((error) => console.log(error))
          .finally(() => setLoader(false))
        toast.success('Item Deleted successfully')
      }else{
        toast.error('ERROR')
      }
    })
  }
  
  return (
    <>
    {
      loader ? <Loader/> : (<div className='w-full h-20 flex items-center justify-between border-t border-solid border-gray-300 p-5'>
        <div className='w-16 h-16 flex items-center '>
         <img className='w-full h-full' src={item.Image} alt="" />
        </div>
        <h1 className='text-sm w-44 '>{item.Tittle}</h1>
        <span>{item.Price}</span>
        <div>
         <input onChange={(e) => {handleQuantity(e.target.value)}} className=' w-16 border border-solid border-gray-500 outline-none pl-5 ' type="number" value={updatedValueInCart.updatedQuantity} min={1} max={10}/>
        </div>
        <span>{updatedValueInCart.updatedTotal}</span>
     <button onClick={() => {deleteItem()}}><MdDelete className='text-2xl text-red-500' /></button>
        </div>)
    }
   </>
  )
}

export default memo(Cart) 