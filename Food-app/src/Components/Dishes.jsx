import React, { useState, useContext , } from "react";
import { IoMdAdd } from "react-icons/io";
import { IoIosRemove } from "react-icons/io";
import { AllListContext } from "./Context/AllListContext";

const Dishes = ({ item, id }) => {
  console.log('dishes page');
  
  const { quantity, setQuantity } = useContext(AllListContext);
  const [addBtn, setAddBtn] = useState(false);

  const toggleAddBtn = () => {
    setAddBtn((prev) => !prev); // Toggle button visibility
  };

  const Increase = () => {
    setQuantity((prev) => {
      const currentQuantity = prev[id] || 0; // Get current quantity for item id
      const newQuantity = currentQuantity + 1; // Increment quantity

      // Update the quantity state with new quantity for item id
      const updatedState = {
        ...prev,
        [id]: newQuantity,
      };

      return updatedState;
    });
  };

  const Decrease = () => {
    setQuantity((prev) => {
      const currentQuantity = prev[id] || 0; // Get current quantity for item id
      const newQuantity =
        currentQuantity === 0 ? currentQuantity : currentQuantity - 1; // Decrement quantity

      // Update the quantity state with new quantity for item id
      const updatedState = {
        ...prev,
        [id]: newQuantity,
      };

      return updatedState;
    });
  };

  return (
    <div className=" min-h-72 bg-gray-200   rounded-xl overflow-hidden relative hover:scale-105 max-[600px]:w-96 ">
      <div className="w-full h-26 relative">
        <img className="w-full h-48" src={item.img} alt="img" />
        <div
          className={`w-[95px] h-[35px] bg-white rounded-3xl absolute bottom-2 right-3 flex justify-between items-center px-1 ${
            addBtn ? "block" : "hidden"
          }`}
        >
          <button
            onClick={Decrease}
            className="w-7 h-7 rounded-full bg-red-500 flex justify-center items-center text-xl"
          >
            <IoIosRemove />
          </button>
          <span className="text-lg font-medium">{quantity[id] || 0}</span>
          <button
            onClick={Increase}
            className="w-7 h-7 rounded-full bg-green-500 flex justify-center items-center text-xl"
          >
            <IoMdAdd />
          </button>
        </div>
        <span
          onClick={toggleAddBtn}
          className={`p-[9px] rounded-full cursor-pointer bg-white absolute bottom-2 right-3 ${
            addBtn ? "hidden" : "block"
          }`}
        >
          <IoMdAdd />
        </span>
      </div>

      <div className="p-3 flex flex-col gap-3 mt-3">
        <div className="w-full h-5 flex justify-between items-center">
          <span className="text-md font-medium capitalize">{item.name}</span>
          <span className="text-xs">⭐{item.rating}</span>
        </div>
        <p className="text-xs text-gray-400 leading-4">{item.desc}</p>
        <span className="text-lg font-medium text-orange-400">
          $ {item.price}
        </span>
      </div>
    </div>
  );
};

export default Dishes;
