import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const CompletedTask = () => {
    const {completedTask} = useSelector(state => state.taskSlice)

    
    useEffect(() => {

    } , [])
 console.log(completedTask , "completedtask");
 
  return (
    <div>CompletedTask</div>
  )
}

export default CompletedTask