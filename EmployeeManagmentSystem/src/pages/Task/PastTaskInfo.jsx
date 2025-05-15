import React from 'react'
import { Tasks } from '../../export';
import { useSelector } from 'react-redux';
const PastTaskInfo = () => {
  const {currentUserDetails} = useSelector(state => state.authSlice)
    const taskInfo = [
         {
            color : "bg-sky-400",
            value : currentUserDetails.newTask | 0,
            name : "New Task"
         }, 
         {
          color : "bg-yellow-400",
          value : currentUserDetails.completedTask | 0,
          name : "Completed Task"
         },
         {
            color : "bg-green-400",
            value :  currentUserDetails.acceptedTask | 0,
            name : "Accepted Task"
         },
         {
           color : "bg-red-400",
           value : currentUserDetails.failedTask | 0,
           name : "Failed Task"
         }
     ];
  return (
    <div className='w-full grid grid-cols-[repeat(4,_minmax(150px,_1fr))] max-md:grid-cols-2 max-md:grid-rows-2 gap-4 max-md:px-8 px-14 mt-10 max-sm:mt-5'>
           {
              taskInfo.map((item , index) => (
                 <Tasks key={index} item={item}/>
              ))
           }
        </div>
  )
}

export default PastTaskInfo