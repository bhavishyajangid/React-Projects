import React from "react";
const Cards = ({ item }) => {
  return (
    <div className="w-72 h-[280px] rounded-xl bg-gray-400 px-4 pb-3 cursor-pointer  ">
      <img
        className=" h-40 w-full transition-transform duration-300 ease-in-out hover:scale-110"
        src={item.image_url}
        alt="img"
      />
      <h1 className="text-xl">{item.pokemon}</h1>
      <span>{item.type}</span>
      <span>abilities : {item.abilities[0]}</span>
      <br />
      <span>Location : {item.location}</span>
    </div>
  );
};

export default Cards;
