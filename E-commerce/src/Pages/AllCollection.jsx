import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Loader, Tittle } from '../export';
import { setAllProducts, setFilterProducts, setSortedArray } from '../Store/allproduct';
import { toast } from 'react-toastify';
const AllCollection = () => {
    const { filterProducts } = useSelector((state) => state.allProducts); 
      
    const dispatch = useDispatch()
    const handleSort = (event) => {
       dispatch(setSortedArray(event))
    }
  return (
    <>
    <div className='w-4/5 max-sm:w-full mt-5 max-sm:mt-0'>

 
    <div className='flex items-center'>
        <Tittle text1='ALL' text2="COLLECTION" para={false} className='text-left text-[28px] max-sm:text-xl'/>
       
       <select onChange={(event) => {handleSort(event.target.value)}} className=' h-10 px-2 max-sm:px-0 text-sm border-2 border-solid border-gray-300 outline-none rounded-sm' name="" id="">
        <option  value="">Sort by : Relevent</option>
        <option value="asc">Sort by : Low To High</option>
        <option value="desc">Sort by : High To Low</option>
       </select>
    </div>
    <div className="w-full grid grid-cols-responsive max-sm:grid-cols-2   ">
        { 
         filterProducts.length > 0 ?
          filterProducts?.map((item) => (
            <Card key={item.id} item={item} id={item.id} />
          )) : <p className='text-center relative top-40 left-80 text-gray-600'>Not found</p>
        }
      </div>
      </div>
     </>
  )
}

export default AllCollection