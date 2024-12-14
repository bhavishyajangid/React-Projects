import React from 'react'

const TaskDetails = ({bgColor}) => {
  return (
    <div className={`w-80 h-64   rounded-lg p-5 ${bgColor} `}>
        <div className='w-full flex justify-between items-center'>
        <span className='px-2 py-1 bg-red-500 text-sm font-medium rounded-md'>High</span> 
        <span className='font-medium'>20 feb 2024</span>
        </div>

<div className=' h-48 overflow-y-scroll scroll-bar'>
        <h2 className='font-medium text-lg mt-5'>Make a youtube Video </h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem hic fugiat quis! Facilis, inventore quibusdam. Voluptates ratione repellendus sed quos exercitationem beatae! Officiis repellendus voluptatum saepe aliquid earum molestias aspernatur.
        Delectus neque, omnis saepe vero non eum error ipsam rerum voluptatum sapiente asperiores iure earum pariatur hic rem distinctio nostrum dolores est expedita incidunt? Maiores corporis ut esse fuga officiis.
        Delectus, fugiat! Aut eligendi quam recusandae vitae labore totam ullam alias sint vero assumenda, deleniti, cumque corrupti, perspiciatis voluptatum? Quam officiis fuga pariatur libero a</p>
</div>

    </div>
  )
}

export default TaskDetails