import React, { useContext, useEffect , } from "react";
import { AiFillDelete } from "react-icons/ai";
import { AllListContext } from "./Context/AllListContext";

const Cart = ({ item, id }) => {
  console.log('cart');
  
  const { quantity, setQuantity , setDiscount , addToCartItem } = useContext(AllListContext);






  const deleteItemFromCart = () => {
    const obj = Object.fromEntries(
      Object.entries(quantity).filter(([key, value]) => parseInt(key) !== id)
    );

    setQuantity(obj);
    if(addToCartItem.length == 0){
      setDiscount(0)
     }

  };




  return (
    <div className="w-full min-h-12 flex justify-between items-center text-sm font-medium border-b border-b-gray-300">
      <div className="w-32  flex justify-center max-sm:font-normal">
        <img
          className="w-10 h-10 max-sm:w-8 max-sm:h-8 "
          src={item.img}
          alt="img"
        />
      </div>
      <span className="w-32  text-center max-sm:font-normal">{item.name}</span>
      <span className="w-32  text-center max-sm:font-normal">
        ₹ {item.price}
      </span>
      <span className="w-32  text-center max-sm:font-normal">
        {quantity[id]}
      </span>
      <span className="w-32  text-center max-sm:font-normal">
        ₹ {quantity[id] * item.price}
      </span>
      <button
        onClick={deleteItemFromCart}
        className="w-32  flex justify-center "
      >
        <AiFillDelete className="text-red-500 text-xl" />
      </button>
    </div>
  );
};

export default Cart;
