import React from "react";
const Cards = ({ item}) => {
  // console.log(item.types , 'item');
  
  return (
    <div className=" rounded-xl bg-gray-400 p-5 cursor-pointer max-h-60 max-sm:min-w-full max-w-80">
      <span>{item.id}</span>
      <img
        className=" h-32 transition-transform duration-300 ease-in-out hover:scale-110 m-auto"
        src={item.sprites.front_default}
        alt="img"
      />
      <h1 className="text-xl">{item.name}</h1>
      <div className="flex gap-2"> 
      {
        item.types.map((info) =>  <span>{info.type.name} </span> 
      )
    }
    </div>
    </div>
  );
};

export default Cards;
