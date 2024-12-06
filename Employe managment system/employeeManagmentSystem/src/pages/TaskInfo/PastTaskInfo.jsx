import React from 'react'
import { Tasks } from '../../export';
const PastTaskInfo = () => {
    const bgColor = ['bg-sky-400', 'bg-yellow-400' ,"bg-green-400" , "bg-red-400" , ];
  return (
    <div className='w-full grid grid-cols-[repeat(4,_minmax(150px,_1fr))] max-md:grid-cols-2 max-md:grid-rows-2 gap-4 max-md:px-8 px-14 mt-10 max-sm:mt-5'>
            {bgColor.map((item, index) => (
                <Tasks key={index} bgColor={item} />
            ))}
        </div>
  )
}

export default PastTaskInfo