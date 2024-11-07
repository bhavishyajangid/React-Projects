import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Loader, Tittle } from '../export';
import { setAllProducts, setFilterProducts } from '../Store/allproduct';
import { toast } from 'react-toastify';
const AllCollection = () => {
    const {allProducts, filterProducts } = useSelector((state) => state.allProducts); 
      
    const dispatch = useDispatch()
    const handleSort = (event) => {
        console.log(filterProducts , 'filterproducts');
        
        if(event === 'asc'){
            dispatch(setFilterProducts(filterProducts.sort((a , b) => a.price - b.price)))
        }else if(event === 'desc') {
            dispatch(setFilterProducts(filterProducts.sort((a , b) => b.price - a.price)))
        }else{
            dispatch(setFilterProducts(allProducts))
        }
    }
  return (
    <>
    <div className='w-4/5 mt-5 '>

 
    <div className='flex items-center'>
        <Tittle text1='ALL' text2="COLLECTION" para={false} className='text-left text-[28px]'/>
       
       <select onChange={(event) => {handleSort(event.target.value)}} className=' h-10 px-2 text-sm border-2 border-solid border-gray-300 outline-none rounded-sm' name="" id="">
        <option  value="">Sort by : Relevent</option>
        <option value="asc">Sort by : Low To High</option>
        <option value="desc">Sort by : High To Low</option>
       </select>
    </div>
    <div className="w-full grid grid-cols-responsive max-sm:grid-cols-2  mt-2  ">
        {
          // display all the cards
          
          filterProducts?.map((item) => (
            <Card key={item.id} item={item} id={item.id} />
          )) 
        }
      </div>
      </div>
     </>
  )
}

export default AllCollection