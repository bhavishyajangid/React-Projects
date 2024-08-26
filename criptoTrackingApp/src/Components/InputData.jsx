import React, { useState } from 'react'
import { DataContext } from '../Context/DataContext'
import { useContext } from 'react'

const InputData = () => {
   const [localValue , setLocalValue] = useState("")
  const {setInputValue} = useContext(DataContext)

  const handleInput = (event) =>{
       setLocalValue(event.target.value)
  }

  const handleBtn = () =>{
      setInputValue(localValue)
  }
 
  return (
    <div className='w-full flex justify-center items-center p-5 ' >
        <div className='w-96 h-14 mt-5 bg-white rounded-lg flex items-center overflow-hidden p-2'>
            <input value={localValue} onChange={(event)=>{handleInput(event)}}   type="text" className='w-72 h-full text-lg outline-none border-none px-2 font-medium placeholder:text-[16px] placeholder:font-normal' placeholder='Search crypto' />
            <button className='w-20 h-10 rounded-lg text-white font-medium bg-purple-600 ' onClick={handleBtn} >Search</button>
        </div>
    </div>
  )
}

export default InputData