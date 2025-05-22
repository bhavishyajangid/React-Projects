import React from 'react'
import { useSelector } from 'react-redux'
import AllTask from './AllTask';

const AcceptedTask = () => {
    const {acceptedTask} = useSelector(state => state.taskSlice)
    console.log(acceptedTask.task , "acceptedTask");
    
  return (
   <AllTask tasks={acceptedTask.task} heading="Accepted Task"/>
  )
}

export default AcceptedTask