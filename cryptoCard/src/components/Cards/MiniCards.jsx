import React, { memo } from 'react'
const MiniCards = React.memo(({index , item , setImg , selectedImg}) => {
    
  return (
    <div className={`w-18 h-10 p-1 rounded-sm cursor-pointer ${selectedImg == index ? "border border-solid border-blue-400 " : ""}` } onClick={() => {setImg(index)}} >
       <img className=' w-full h-full' src={item.miniImg}alt="" />
    </div>
  )
})

export default MiniCards