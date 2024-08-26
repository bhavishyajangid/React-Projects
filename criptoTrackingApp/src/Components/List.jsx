import Result from "./Result";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { DataContext } from "../Context/DataContext";

const List = ({ item, id }) => {
  const { currencyInfo } = useContext(DataContext);

  return (
    <Link to={`/result/${id}`}>
      <div className="w-full h-14 flex items-center  px-5 text-white border-gray-600 border-b max-sm:px-3 cursor-pointer z-1 ">
        <div className="w-1/2 flex font-medium ">
          <span>{item.market_cap_rank}</span>
          <img src={item.image} alt="" className="h-7 w-7 ml-14 max-sm:ml-5" />
          <span className="ml-1">{item.name}</span>
        </div>

        <div className="w-1/2 flex justify-between items-center max-sm:justify-end max-sm:gap-10   ">
          <span>
            <span>{currencyInfo === "usd" ? "$" : "₹"}</span>{" "}
            {item.current_price}
          </span>
          <span className="text-red-600">
            {item.ath_change_percentage.toFixed(1)}
          </span>
          <span className="max-sm:hidden">
            <span>{currencyInfo === "usd" ? "$" : "₹"}</span> {item.market_cap}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default List;
