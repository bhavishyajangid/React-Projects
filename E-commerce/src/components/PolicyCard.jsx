import React from 'react'
const PolicyCard = ({icon , text1 , text2}) => {
  return (
      <div className='px-10  py-10  flex flex-col items-center justify-center'>
        <span className='text-4xl'>{icon}</span>
        <h1 className='text-[15px] font-semibold text-gray-800 mt-2'>{text1}</h1>
        <p className='text-[15px] font-medium text-gray-400 text-center'>{text2}</p>
      </div>
  )
}

export default PolicyCard