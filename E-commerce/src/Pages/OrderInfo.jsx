import React, { useCallback, useState } from "react";
import { CartTotal, Tittle, PaymentLoader } from "../export";
import OrderForm from "./OrderForm";
import { useDispatch, useSelector } from "react-redux";
import OrderServices from "../appwrite/orders";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setUserDetails } from "../Store/orders";
import dataBaseService from "../appwrite/cart";
import { addToCartItem, removePromo } from "../Store/addToCart";

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

  const markCouponAsUsed = (code) => {
    if (!userData?.$id || !code) return;
    const key = `usedCoupons_${userData.$id}`;
    const used = JSON.parse(localStorage.getItem(key) || '[]');
    if (!used.includes(code)) {
      used.push(code);
      localStorage.setItem(key, JSON.stringify(used));
    }
  };

  console.log(cartTotal.Method, "outer");
  const placeOrder = useCallback(async (data) => {
    console.log(cartTotal.Method, "inner");
    if (cartTotal.Method) {

      setLoader(true);
      try {
        // Use Promise.all instead of forEach+async to properly await all orders
        const orderPromises = cartItem.map(async (item) => {
          const itemTotal = (item.price * item.quantity) || 0;
          return OrderServices.placeOrder({
            $id: item.$id,
            productId: item.productId || item.$id,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
            title: item.title,
            total: itemTotal,
            userId: item.userId,
            status: "Order Placed",
            method: cartTotal.Method,
            // Delivery info from the checkout form — lowercase to match Appwrite DB attributes
            firstname: data.firstName,
            lastname: data.lastName,
            emailaddress: data.email,
            street: data.street,
            city: data.city,
            state: data.state,
            zipcode: data.zipcode,
            country: data.country,
            phone: data.phone,
          });
        });

        const responses = await Promise.all(orderPromises);
        const allSuccessful = responses.every(res => !!res);

        if (allSuccessful) {
          // Mark coupon as used if promo was applied
          if (cartTotal.promoApplied && cartTotal.promoCode) {
            markCouponAsUsed(cartTotal.promoCode);
          }
          dispatch(removePromo());

          // Delete cart items after successful order
          await Promise.all(cartItem.map((item) => dataBaseService.deleteCart(item.$id)));

          dispatch(setUserDetails(data));
          toast.success("Orders successfully placed");

          // Navigate with order data so AllOrders can show confirmation
          navigate("/order", {
            state: {
              orderResponses: responses,
              cartTotal: cartTotal,
            }
          });
        } else {
          toast.error("Failed to place one or more orders");
        }

      } catch (error) {
        console.error(error);
        toast.error("ERROR: Technical error occurred");
      } finally {
        setLoader(false);
      }
    } else {
      alert('select a payment method')
    }
  },
    [cartItem, userData, cartTotal.Method]
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
