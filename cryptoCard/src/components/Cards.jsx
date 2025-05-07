import React from 'react'

const Cards = ({card}) => {
  return (
    <div
              key={card.id}
              className="bg-zinc-900/50 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-zinc-700 relative "
            >
                  <span className="text-xs bg-sky-300 font-semibold text-gray-900 py-1 px-4 rounded-full absolute right-5">
                  {card.badge}
                </span>
              <div className="my-11 ">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-40 object-contain  rounded-xl"
                />
              
              </div>
              <div className="text-xl font-semibold mb-2 text-white">
                {card.title}
              </div>
              <p className="text-sm text-[#6c6c70] leading-relaxed">
                {card.text}
              </p>
            </div>
  )
}

export default Cards