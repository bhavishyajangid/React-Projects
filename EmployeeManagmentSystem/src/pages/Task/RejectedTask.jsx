import React from 'react'
import { useSelector } from 'react-redux'
import AllTask from './AllTask';

const RejectedTask = () => {
    const {rejectedTask} = useSelector(state => state.taskSlice)
    console.log(rejectedTask , 'rejectedTaask');
    
  return (         
   <AllTask tasks={rejectedTask.task} heading="Rejected Task"/>
  
  )
}

export default RejectedTask