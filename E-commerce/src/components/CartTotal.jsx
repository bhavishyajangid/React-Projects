import React, { useEffect, useState } from "react";
import Tittle from "./Tittle";
import { Link } from "react-router-dom";
import Button from "./Button";
import { AllPaymentOption, PaymentOption, Promo } from "../export";
import { useSelector } from "react-redux";
const CartTotal = ({ cartTotal, className = "", btn = "true" }) => {

  return (
    <>
      <div className={`text-black text-sm  ${className}`}>
        <Tittle
          text1="CART"
          text2="TOTAL"
          para={false}
          className="text-[27px] leading-none"
        />
        <p className="text-gray-500 text-xs ">
          Orders below ₹500 will incur a delivery charge of $10
        </p>
        <div className="w-full h-10 border-b border-b-gray-300 flex justify-between items-center p-1">
          <span>SubTotal</span>
          <span>$ {cartTotal.subTotal || 0}</span>
        </div>
        <div className="w-full h-10 border-b border-b-gray-300 flex justify-between items-center p-1">
          <span>Delivery Fee</span>
          <span>$ {cartTotal.delivery || 0}</span>
        </div>

        {/* <div className={`w-full h-10 border-b border-b-gray-300 flex justify-between items-center p-1 `}>
        <span className='text-md text-gray-500'>Discount <span>{}</span> % Off</span>
        <span className='text-md text-gray-500'>₹ {0}</span>
      </div> */}

        <div className="w-full h-10 flex justify-between items-center p-1">
          <span className="text-base font-semibold">Total</span>
          <span className="text-base text-gray-800 font-medium">
            $ {cartTotal.Total || 0}
          </span>
        </div>

        {btn && (
          <Link to="/orderinfo">
            <Button className="w-56 h-9 mt-5 bg-black text-white text-sm rounded-md max-sm:w-[50%] max-sm:text-[13px] ">
              PROCEED TO CHECKOUT
            </Button>
          </Link>
        )}

      </div>
        {btn == false ? <AllPaymentOption /> : <Promo />}
    </>
  );
};

export default CartTotal;
