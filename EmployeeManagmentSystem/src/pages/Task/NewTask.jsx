import React from 'react'
import { useSelector } from 'react-redux'
import AllTask from './AllTask';

const NewTask = () => {
    const {newTask} = useSelector(state => state.taskSlice)
    console.log(newTask ,'newtASK');
    
  return (
    <AllTask tasks={newTask.task} heading="New Task"/>
  )
}

export default NewTask