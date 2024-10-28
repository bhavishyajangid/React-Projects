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
    <div className="w-[120px] h-[35px]  rounded-3xl  bottom-2 right-3 flex justify-between items-center px-1">
      <button
        onClick={() => {
          dispatch(decreaseQunatity(id));
        }}
        className="px-2 py-1.5 rounded-lg  text-md  bg-red-500 flex justify-center items-center "
      >
        <IoIosRemove />
      </button>
      <span className="text-xl font-medium">{Quantity[id] || 1}</span>
      <button
        onClick={() => {
          dispatch(increaseQuantity(id));
        }}
        className="px-2 py-1.5 rounded-lg  text-md  bg-green-500 flex justify-center items-center "
      >
        <IoMdAdd />
      </button>
    </div>
  );
};

export default QuantityBtn;
