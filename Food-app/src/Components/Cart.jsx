import React, { useEffect , } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeItem} from "../Store/addToCart";
import QunatitysetBtn from "./QunatitysetBtn";

const Cart = ({ item, id }) => {
  const {Quantity} = useSelector(state => state.addToCart)
  const dispatch = useDispatch()
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
     <QunatitysetBtn id={id}/>
      <span className="w-32  text-center max-sm:font-normal">
        ₹ {Quantity[id] * item.price}
      </span>
      <button
        onClick={() => {dispatch(removeItem(id))}}
        className="w-32  flex justify-center "
      >
        <AiFillDelete className="text-red-500 text-xl" />
      </button>
    </div>
  );
};

export default Cart;
