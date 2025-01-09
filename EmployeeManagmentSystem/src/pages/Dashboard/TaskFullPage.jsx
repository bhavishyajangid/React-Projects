import React from 'react'
import { useParams } from 'react-router'

const TaskFullPage = () => {
  const {TaskId} = useParams()
  console.log(TaskId);
  
  return (
    <>
    <div>TaskFullPage</div>
    </>
  )
}

export default TaskFullPage