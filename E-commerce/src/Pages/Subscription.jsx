import React from 'react'
import { Button, Input } from '../export'

const Subscription = () => {
  return (
    <div className='w-4/5 max-lg:w-11/12 m-auto leading-8 items-center justify-center flex flex-col mt-20 mb-10'>
<h1 className='text-xl font-medium max-sm:text-lg'>Subscribe now & get 20% off</h1>
<p className='text-gray-400 text-center max-sm:text-sm'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
<div className='w-1/2 h-12 flex justify-between overflow-hidden border border-solid border-r-0 border-gray-300 mt-4 max-md:w-4/5 max-sm:w-full max-sm:h-10'>
    <Input className='w-3/4 h-full max-sm:text-sm px-3 outline-none '/>
    <Button className='w-36 h-12 max-sm:h-10 bg-black text-white rounded-none text-[15px] font-normal max-sm:text-xs max-sm:w-32  '>
      Subscription
    </Button>
</div>
    </div>
  )
}

export default Subscription