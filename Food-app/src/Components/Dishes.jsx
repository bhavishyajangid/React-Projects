import React, { memo, useState} from "react";
import QunatitysetBtn from "./QunatitysetBtn";
import { PiShoppingCartThin } from "react-icons/pi";
const Dishes = ({ item, id }) => {

  const [addBtn , setAddBtn] = useState(false)
  console.log('render dish');
  
  return (
    <div className=" min-h-72 bg-gray-200   rounded-xl overflow-hidden relative hover:scale-105 max-[600px]:w-96 ">
      <div className="w-full h-26 relative">
        <img className="w-full h-48" src={item.img} alt="img" />
        {
          addBtn ? <QunatitysetBtn id={id} addBtn={addBtn}  />
      : <span
          onClick={() => {setAddBtn(true)}}
          className={`p-[9px] rounded-full cursor-pointer bg-white absolute bottom-2 right-3 ${
            addBtn ? "hidden" : "block"
          }`}
        >
          <PiShoppingCartThin />
        </span>
}
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

export default Dishes ;
