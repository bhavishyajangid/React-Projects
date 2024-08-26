import React from 'react'
import Headings from './Headings'
import InputData from './InputData'
import AllLists from './AllLists'

const Main = () => {
  return (
    <div className='w-full h-[110vh]'>
    <Headings/>
    <InputData/>
    <AllLists/>
    </div>
  )
}

export default Main