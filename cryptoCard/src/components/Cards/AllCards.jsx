import React, { useCallback, useState } from 'react'
import MiniCards from './MiniCards'
const AllCards = () => {
    const cards = [
        {
          miniImg: "minicardgold.png",
          fullImg: "public/cardgold.png",
        },
        {
          miniImg: "public/minicardau.png",
          fullImg: "public/cardau.png",
        },
    ]

    const [selectedImg , setSelectedImg] = useState(0)

    const setImg = useCallback((index) => {
         setSelectedImg(index)
    } , [])

  return (
    <div className='w-full p-5 relative flex flex-col gap-5'>
        <div className='px-3 py-1 bg-[#1f1f1f] w-fit rounded-md absolute right-8 '>
         <span className='bg-[linear-gradient(to_right,_#f8f32b,_#fff)] bg-clip-text text-transparent '>Limited Edition</span>
        </div>
        <img  src={cards[selectedImg].fullImg} alt="cards img" className='mt-10' />
        

        <div className='flex flex-col gap-3'>
            <h1 className='text-xl text-[#fff]'>Tangam Wallet</h1>
                <p className='text-xs text-[#6c6c70]'>Collection Sun Drop</p>
            <div>
                <div className='w-full relative overflow-x-scroll scrollbar-none flex gap-3 '>
                    {
                        cards.map((item , index) => (
                            <MiniCards key={index} item={item} index={index} setImg={setImg} selectedImg={selectedImg}/>
                        ))
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default AllCards