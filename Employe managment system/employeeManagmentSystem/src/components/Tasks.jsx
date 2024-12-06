import React from 'react'

const Tasks = ({bgColor}) => {
  return (
    <div className={` h-24 rounded-lg  flex flex-col justify-center px-10 max-md:px-8 max-sm:px-5  ${bgColor} `}>
        <span className='text-xl font-semibold'>0</span>
        <h1 className='text-xl font-medium'>New Task</h1>
    </div>
  )
}

export default Tasks