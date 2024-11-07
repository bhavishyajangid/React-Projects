import React from "react";
import {AllCollection, Filter, Searchbar } from "../export";
import { useSelector } from "react-redux";

const Collection = () => {
    const {searchBar} = useSelector(state => state.allProducts)
  return (
    <>
    <div className="w-4/5 max-lg:w-11/12 m-auto">
    {
        searchBar && <Searchbar/>
    }
 
 <div className="w-full flex gap-10">
 <Filter/>
 <AllCollection/>
 </div>




    </div>
    </>
  );
};

export default Collection;
