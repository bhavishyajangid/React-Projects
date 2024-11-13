import React, { useCallback, useState } from "react";
import { CartTotal, Tittle, PaymentLoader } from "../export";
import OrderForm from "./OrderForm";
import { useDispatch, useSelector } from "react-redux";
import OrderServices from "../appwrite/orders";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setUserDetails } from "../Store/orders";
import dataBaseService from "../appwrite/cart";
import { addToCartItem } from "../Store/addToCart";

const OrderInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItem, cartTotal } = useSelector((state) => state.addToCart);
  const { userData } = useSelector((state) => state.authSlice);
  const [loader, setLoader] = useState(false);
  const todayDate = new Date();
  const formattedDate =
    todayDate.getFullYear() +
    "-" +
    (todayDate.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    todayDate.getDate().toString().padStart(2, "0");

  console.log(cartTotal.Method, "outer");
  const placeOrder = useCallback(async (data) => {
    console.log(cartTotal.Method, "inner");
    if(cartTotal.Method){
    
        setLoader(true);
        try {
          cartItem.forEach(async (item) => {
            const response = await OrderServices.placeOrder({
              Id: item.Id,
              Image: item.Image,
              Price: item.Price,
              Quantity: item.Quantity,
              Tittle: item.Tittle,
              Total: item.Total,
              userId: item.userId,
              Status: "Orders",
              Method: cartTotal.Method,
              Date: formattedDate,
            });
            if (response) {
              navigate("/order");
              cartItem.forEach((item) => {
                dataBaseService.deleteCart(item.Id);
              });
              dispatch(setUserDetails(data));
            } else {
              toast.error("Failed to place order");
            }
          });
          toast.success("Orders sucessfully placed");
        
        } catch (error) {
          console.error(error);
          toast.error("ERROR: Technical error occurred");
        } finally {
          setLoader(false);
        }
      }else{
        alert('select a payment method')
      }
    },
    [cartItem, userData , cartTotal.Method]
  );

  return (
    <>
      {loader ? (
        <PaymentLoader />
      ) : (
        <div className="w-4/5 max-lg:w-11/12 min-h-[60vh] m-auto">
          <Tittle
            text1={"Delivery"}
            text2={"Information"}
            para={false}
            className="text-left mt-10 text-3xl max-sm:text-center max-sm:mt-3"
          />

          <div className="w-full flex justify-between max-sm:flex-col max-sm:items-center">
            <OrderForm placeOrder={placeOrder} />

            <div className="w-1/2 max-sm:w-full flex flex-col items-end">
              <CartTotal
                className="w-4/5 max-sm:w-full max-sm:mt-5"
                btn={false}
                cartTotal={cartTotal}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderInfo;
