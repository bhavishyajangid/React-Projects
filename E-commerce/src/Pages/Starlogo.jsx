import React from 'react'
import starfill from '../assets/startfill.png'

import starnotfill from '../assets/startnotfill.png'
const Starlogo = () => {
  return (
    <div className=' flex gap-2'>
        <img className='w-3 h-3' src={starfill} alt="img" />
        <img className='w-3 h-3' src={starfill} alt="img" />
        <img className='w-3 h-3' src={starfill} alt="img" />
        <img className='w-3 h-3' src={starfill} alt="img" />
        <img className='w-3 h-3' src={starnotfill} alt="img" />
    </div>
  )
}

export default Starlogo