import React from "react";
import { IoMdAdd } from "react-icons/io";
import { IoIosRemove } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { decreaseQunatity, increaseQuantity } from "../../Store/allproduct";
const QuantityBtn = ({ 
  id 
}) => {

  const { Quantity } = useSelector((state) => state.allProducts);
  const dispatch = useDispatch();
  return (
    <div className="w-[110px] h-11 border border-gray-300 rounded-full flex justify-between items-center px-3">
      <button
        onClick={() => {
          dispatch(decreaseQunatity(id));
        }}
        className="text-gray-500 hover:text-black text-xl flex justify-center items-center h-full"
      >
        <IoIosRemove />
      </button>
      <span className="text-base font-medium text-gray-700">{Quantity[id] || 1}</span>
      <button
        onClick={() => {
          dispatch(increaseQuantity(id));
        }}
        className="text-gray-500 hover:text-black text-xl flex justify-center items-center h-full"
      >
        <IoMdAdd />
      </button>
    </div>
  );
};

export default QuantityBtn;

