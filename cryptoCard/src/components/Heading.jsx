import React from 'react'

const Heading = ({heading}) => {
    const words = heading.split(' ');
    const firstWord = words[0];
    const remainingWords = words.slice(1).join(' ');
    
  return (
    <h1 className='text-[35px] text-[#fff] font-semibold text-center leading-10'> <span className='bg-[linear-gradient(to_right,_#6c6c70,_#f0f0f0)] bg-clip-text text-transparent'>{firstWord}</span> {remainingWords}</h1>
  )
}

export default Heading