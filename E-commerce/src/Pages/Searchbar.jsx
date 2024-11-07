import React from 'react'
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import { toggleSearchBar } from '../Store/allproduct';
const Searchbar = () => {
  const {searchBar} = useSelector(state => state.allProducts);
  const dispatch = useDispatch()
  return (
    <div className="w-full h-20 flex justify-center items-center gap-5 bg-gray-100 border-t border-b border-solid border-gray-300 mt-5 ">
    <div className="w-1/2  rounded-3xl border border-solid border-gray-500 overflow-hidden  max-sm:w-4/5">
      <input
        className="w-11/12 px-5 text-base capitalize bg-transparent  h-9 outline-none "
        type="text"
        placeholder="Search"
      />
      <span className="cursor-pointer"></span>
    </div>
    <span onClick={() => {dispatch(toggleSearchBar(!searchBar))}} className='text-lg cursor-pointer'><RxCross2 /></span>
  </div>
  )
}

export default Searchbar