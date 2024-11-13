import React from 'react';
import { Card, Tittle, Loader } from '../export';
import { useDispatch } from 'react-redux';
import { setSortedArray } from '../Store/allproduct';

const AllCollection = ({ filterProducts }) => {
  const dispatch = useDispatch();

  const handleSort = (event) => {
    dispatch(setSortedArray(event.target.value)); // Dispatch sort action
  };

  return (
    <div className="w-4/5 max-sm:w-full mt-5 max-sm:mt-0">
      <div className="flex items-center">
        <Tittle text1="ALL" text2="COLLECTION" para={false} className="text-left text-[28px] max-sm:text-xl" />
        <select onChange={handleSort} className="h-10 px-2 max-sm:px-0 text-sm border-2 border-solid border-gray-300 outline-none rounded-sm">
          <option value="">Sort by : Relevant</option>
          <option value="asc">Sort by : Low To High</option>
          <option value="desc">Sort by : High To Low</option>
        </select>
      </div>

      {/* Show loader if filterProducts is empty or being filtered */}
      {filterProducts.length === 0 ? (
         <p className='text-lg capitalize text-center relative top-20 max-sm:top-10'>not found</p>
      ) : (
        <div className="w-full grid grid-cols-responsive max-sm:grid-cols-2">
          {filterProducts.map((item) => (
            <Card key={item.id} item={item} id={item.id} />
          ))} 
        </div>
        
      )}
    </div>
  );
};

export default AllCollection;
