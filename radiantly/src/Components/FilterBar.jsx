import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterData } from "../Store/DataSlice";


function FilterBar() {
  const {data , filter} = useSelector((state) => state.mydata)
  const dispatch = useDispatch()

  // seprate all the types of the pokemon without duplicates 
  const types = [];
data.forEach(pokemon => {
  pokemon.types.forEach(info => {
    if (!types.includes(info.type.name)) {
      types.push(info.type.name);
    }
  });

});
  return (
      <select
      value={filter}
        onChange={e => dispatch(filterData(e.target.value))}
        className="px-3 py-1.5 outline-none text-sm border rounded   mb-3"
      >
        <option value="filter">Filter</option>
        {types.map((item) => <option key={item} value={item}>{item}</option> )  }
      </select>
    
  );
}

export default FilterBar
