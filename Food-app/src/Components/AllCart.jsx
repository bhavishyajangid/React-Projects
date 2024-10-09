import React, { useContext, useEffect, useRef, useState } from "react";
import Cart from "./Cart";
import TotalPayment from "./TotalPayment";
import { useDispatch, useSelector } from "react-redux";
import { addPromoCode, TotalPaymentCalculate } from "../Store/PaymentInfo";
import { addItemInCart } from "../Store/addToCart";

const AllCart = () => { 

  const {Quantity , itemsInCart} = useSelector((state) => state.addToCart)
  const {FoodData} = useSelector((state) => state.Items)
  const dispatch = useDispatch()
  const inputValue = useRef("");
  

useEffect(() => {
  const keys = Object.keys(Quantity);
  const result = keys.map((item) => 
     FoodData.filter((item2) => item2.id == item)
  ).flat()
  const subtotal = result.reduce((acc , item , i) => {
          return acc + item.price * Quantity[item.id]
  } , 0)
  
  dispatch(addItemInCart(result))
  dispatch(TotalPaymentCalculate(subtotal))
}, [Quantity])

  function handleSubmitBtn() {
    if(itemsInCart.length !==0){
      dispatch(addPromoCode(inputValue.current.value))
    }else{
      alert("please first add a item in your cart")
    }
    inputValue.current.value = ''
  }
  return (
    <>
      <div
        style={{ minHeight: "calc(100vh - 4rem)" }}
        className="w-full flex flex-col  items-center max-[500px]:justify-evenly "
      >
        <div className="w-4/5 min-h-60 max-[500px]:w-full max-[500px]:px-5 flex flex-col gap-2 ">
          <div className="w-full h-12 flex justify-between items-center text-sm text-gray-500 border-b border-b-gray-300">
            <span className="w-32  text-center">Items</span>
            <span className="w-32  text-center">Tittle</span>
            <span className="w-32  text-center">Price</span>
            <span className="w-32  text-center">Quantity</span>
            <span className="w-32  text-center">Total</span>
            <span className="w-32  text-center">Remove</span>
          </div>


          {  
          itemsInCart.length === 0 ? (
            <p className="text-center text-gray-500">
              Theres no item in your cart
            </p>
          ) : ( 
            itemsInCart.map((item , i) => ( 
              <Cart item={item} key={item.id} id={item.id}   />
            ))
          )}
        </div>

        <div className="w-4/5 min-h-52 max-[500px]:w-full px-6    flex justify-between mt-5">
          <TotalPayment  />
          <div className="w-2/5 h-60 max-md:hidden  ">
          <p className="text-xs text-gray-500 mt-12">use FUTURE20 promo code for 20% discount</p>
            <p className="text-sm text-gray-500 mt-2 ">
              If you have a promo code. Enter it here
            </p>
          
            <div className="w-full h-9  flex rounded-sm overflow-hidden">
              <input
                ref={inputValue}
                className="w-[380px] bg-gray-200 text-sm  pl-2 border-none outline-none max-lg:w-[350px] "
                type="text"
                placeholder="Promo"
              />
              <button
                onClick={handleSubmitBtn}
                className="w-[104px] bg-black text-white text-md max-lg:w-[130px] "
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllCart;
