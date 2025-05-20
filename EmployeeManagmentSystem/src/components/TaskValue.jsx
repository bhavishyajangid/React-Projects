import React from 'react'

const TaskValue = ({item}) => {
  return (
    <div className={` h-24 rounded-lg  flex flex-col justify-center px-8 max-md:px-8 max-sm:px-5  ${item.color} `}>
        <span className='text-xl font-semibold'>{item.value}</span>
        <h1 className='text-xl font-medium'>{item.name}</h1>
    </div>
  )
}

export default TaskValue