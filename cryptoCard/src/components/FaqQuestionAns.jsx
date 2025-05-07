import React from 'react'
import PlusBtn from './btn/PlusBtn'
const FaqQuestionAns = ({toggleDropdown , activeIndex , faq , index}) => {
    let isOpen =  activeIndex == index ? true : false
  return (
      
    <>
    <div
      className="flex flex-col gap-5"
      onClick={() => {toggleDropdown(index)}}
    >
        <div className={`flex justify-between items-center cursor-pointer mt-10 relative ${isOpen ? "text-[#fff]" : "text-[#6c6c70]" }`}>
      <h2 className="text-lg font-medium ">{faq.question}</h2>
      <PlusBtn isOpen={isOpen}/>
        </div>
        
    </div>

    <div
  className={`overflow-hidden transition-all duration-500 ease-in-out ${
    isOpen ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
  } capitalize text-sm font-semibold text-[#6c6c70]`}
>
  <div className="py-2">{faq.answer}
  <hr className="h-[1px] w-full bg-gradient-to-r from-gray-200  to-black border-0 transform scale-y-[0.5] mt-5" />
  </div>
</div>
</>
  )
}

export default FaqQuestionAns