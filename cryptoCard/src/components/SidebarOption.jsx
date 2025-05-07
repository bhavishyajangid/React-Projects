import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
const SidebarOption = ({option}) => {
    const [subOptionOpen , setSubOptionOpen] = useState(false)
  return (
    <div className={`${option.name == "Wallet" ? "text-[#fff]" : "text-[#6c6c70]"}`}>
         <div className="">
            <div onClick={() => {setSubOptionOpen(prev => !prev)}} className='text-[21px]  py-5 flex items-center gap-1'>
                {
                    option.image && <img className='w-5 h-5' src={option.image} alt="img" />
                }
            <span className={`${(option.subOption && subOptionOpen) ? "text-white" : ""}`}>{option.name}</span>
            {
                option.subOption && <IoIosArrowDown className={`text-xs transform transition-transform duration-200 ${subOptionOpen ? "rotate-180" : ""}`} />
            }
            </div>

{
    (option.subOption && subOptionOpen) &&
            <div className='flex flex-col gap-2 mb-5 transform '>
                  {
                    option.subOption.map((opt) => (
                        <div className='flex items-center gap-2'>
                            
                             {
                                opt.image && 
                                <img className='w-5 h-5' src={opt.image} alt="img" />
                             }
                              <span className='text-lg font-semibold'>{opt.name}</span>
                        </div>
                    ))
                  }
            </div>
}
           
         </div>
         <hr className="h-[1px] w-full bg-gradient-to-r from-gray-200  to-black border-0 transform scale-y-[0.5]" />
     </div> 
  )
}

export default SidebarOption