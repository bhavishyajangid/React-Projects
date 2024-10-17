import React from 'react'
import { PolicyCard } from '../export'
import { RiExchangeFundsFill } from "react-icons/ri";
import { FiBox } from "react-icons/fi";
import { BiSupport } from "react-icons/bi";
const Policies = () => {
  return (
    <div className='w-4/5 max-lg:w-11/12 grid grid-cols-policycard  mt-14 m-auto'>
     <PolicyCard text1={"Easy Exchange Policy"} text2={"We offer hassle free exchange policy"} icon={<RiExchangeFundsFill />}/>
     <PolicyCard text1={"7 Days Return Policy"} text2={"We provide 7 days free return policy"} icon={<FiBox />}/>
     <PolicyCard text1={"Best customer support"} text2={"we provide 24/7 customer support"} icon={<BiSupport />}/>
    </div>
  )
}

export default Policies