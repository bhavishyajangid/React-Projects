import React from 'react'

const Tittle = ({text1 , text2 , para = true , className = "text-center text-3xl "}) => {
  return (
    <div className={`w-full  py-5  leading-9 max-sm:leading-6 `}>
        <h1 className={` text-[#374151] font-medium  ${className} `}><span className='text-[#6C7381]'>{text1}</span> {text2} <span className='inline-block w-9 h-[2px] bg-gray-600 max-sm:h-[1.5px]'></span></h1>
        {
          para && <p className='text-[#AAAEB5] text-center'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.</p>
        }
        
        </div>
  )
}

export default Tittle