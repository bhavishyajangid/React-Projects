import React, { useContext } from 'react';
import Lists from './Lists';
import AllListContextProvider, { AllListContext } from './Context/AllListContext';

const AllLists = () => {
  const {AllCatogries} = useContext(AllListContext)
  return (
    <div className='w-5/6 h-36  flex  m-auto mt-7 overflow-x-auto scrollbar-hide  border-solid border-b-[1px] border-gray-300 max-sm:w-full ' id='menu'>
      <div className='flex gap-2'>

        {
          AllCatogries.map((item, index) => (
            <Lists key={index} item={item} />
          ))
        }


      </div>
    </div>
  );
}

export default AllLists;
