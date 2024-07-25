import React, { useState } from 'react'
import SearchImg from "../assets/search.png"
import addImg from "../assets/add.png"
import { AllItemsContext } from '../Context/AllListsContext'
import { useContext } from 'react'
import { IoAdd } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

const SearchBar = () => {
  const {closeAddComponent , searchInputValue , setSearchInputValue } = useContext(AllItemsContext)


  // close the add components 
const addItemForm = () =>{
  closeAddComponent()
}

const handleSearchInput = (event) =>{
  setSearchInputValue(event.target.value);
  // Update searchInputValue state
}

  return (
    <div className='w-full  flex justify-between items-center   mt-4'>
     <div className= 'w-5/6 h-9 pl-1 items-center border-white border-solid border flex rounded-lg overflow-hidden'>
     <IoIosSearch className='text-3xl text-white' />
        <input value={searchInputValue} onChange={(event) =>{handleSearchInput(event)}} className='w-72 pr-1 ml-1 border-none outline-none text-white bg-[#323334] ' type="text" name="search" placeholder='Search Contact '  />
     </div>
     <div className='w-10 h-10 bg-white rounded-full flex justify-center items-center cursor-pointer' onClick={addItemForm}>
     <IoAdd className='text-3xl'/>
     </div>
   </div>
  )
}

export default SearchBar