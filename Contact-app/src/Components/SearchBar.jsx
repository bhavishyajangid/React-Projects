import React, { useState } from 'react'
import SearchImg from "../assets/search.png"
import addImg from "../assets/add.png"
import { AllItemsContext } from '../Context/AllListsContext'
import { useContext } from 'react'

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
     <div className= 'w-5/6 h-9 border-white border-solid border flex rounded-lg overflow-hidden'>
        <img className='p-2' src={SearchImg} alt="search" />
        <input value={searchInputValue} onChange={(event) =>{handleSearchInput(event)}} className='w-72 pr-1 border-none outline-none text-white bg-[#323334] ' type="text" name="search" placeholder='Search Contact '  />
     </div>
     <div className='w-10 h-10 bg-white rounded-full flex justify-center items-center cursor-pointer' onClick={addItemForm}>
        <img className='w-7 h-7'  src={addImg} alt="img" />
     </div>
   </div>
  )
}

export default SearchBar