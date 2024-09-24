import React from 'react'
import handLogo from '../assets/handlogowhite.svg'
import lines from '../assets/lines.svg'
import shopify from '../assets/shopify.svg'
import bigcommerce from '../assets/bigcommerce.svg'
import etsy from '../assets/etsy.svg'
import more from '../assets/more.svg'
import presta from '../assets/presta.svg'
import squarespace from '../assets/squarespace.svg'
import wix from '../assets/wix.svg'
import woo from '../assets/woo.svg'
const ConnectStore = () => {
  return (
    <>
    
    <div className='w-11/12 max-w-[1280px]   min-h-96  m-auto py-10 '>
 <div className='w-full '>
    <h1 className='text-5xl font-medium text-center max-md:text-3xl'>Connect your store</h1>
    <p className='text-[#485256] text-center mt-5 max-sm:text-sm'>Printify easily integrates with major e-commerce platforms and marketplaces
</p>
 </div>
 
 <div className='w-full aspect-[5/2]     mt-10 relative bg-contain bg-no-repeat  ' style={{ backgroundImage: `url(${lines})` }}>


  <div className=' w-[12%] h-[27%] rounded-2xl flex justify-center items-center  bg-green-500 overflow-hidden absolute top-[26%] right-[46%] max-sm:rounded-lg max-md:rounded-xl hover:scale-110 transition-all duration-150'>
    <img className='w-[38%] h-[40%]'  src={handLogo} alt="" />
  </div>

  <div className= 'w-[12%] h-[26%]  flex justify-center items-center shadow-customShadow bg-white rounded-2xl absolute bottom-0 right-[40%] overflow-hidden  max-sm:rounded-lg max-md:rounded-xl cursor-pointer hover:scale-110 transition-all duration-150'>
    <img className=' w-[50%] h-[50%]'   src={shopify} alt="" />
  </div>

  <div className= 'w-[9%] h-[21%] shadow-customShadow bg-white rounded-2xl  flex justify-center items-center absolute right-[2%] top-0 max-sm:rounded-lg  max-md:rounded-xl cursor-pointer  hover:scale-110 transition-all duration-150 '>
    <img className='w-[38%] h-[22%]' src={wix} alt="" />
  </div>

  <div className='w-[7%] h-[16%] shadow-customShadow bg-white rounded-2xl  flex justify-center items-center absolute right-[20%] top-[40%] max-sm:rounded-lg max-[400px]:rounded-md  max-lg:rounded-xl cursor-pointer  hover:scale-110 transition-all duration-150'>
    <img className='w-[50%] h-[40%]' src={woo} alt="" />
  </div>


  <div className='w-[9%] h-[22%] shadow-customShadow bg-white rounded-2xl  flex justify-center items-center absolute top-[5%] right-[33%] max-sm:rounded-lg  max-md:rounded-xl cursor-pointer  hover:scale-110 transition-all duration-150'>
    <img className='w-[87%] h-[82%]' src={squarespace} alt="" />
  </div>

  <div  className='w-[14%] h-[33%] shadow-customShadow bg-white rounded-2xl  flex justify-center items-center absolute bottom-[5%] right-[7%] max-sm:rounded-lg  max-md:rounded-xl cursor-pointer  hover:scale-110 transition-all duration-150'>
    <img className='w-[40%] h-[30%]' src={etsy} alt="" />
  </div>

  <div className='w-[8%] h-[19%] shadow-customShadow bg-white rounded-2xl  flex justify-center items-center absolute top-[46%] left-[26%] max-sm:rounded-lg  max-md:rounded-xl cursor-pointer  hover:scale-110 transition-all duration-150'>
    <img className='w-[43%] h-[43%]' src={presta} alt="" />
  </div>

  <div className='w-[6%] h-[15%] shadow-customShadow bg-white rounded-2xl  flex justify-center items-center absolute bottom-[15%] left-[36%] text-[13px] font-medium max-sm:rounded-lg overflow-hidden max-[400px]:rounded-md  max-lg:rounded-xl cursor-pointer  hover:scale-110 transition-all duration-150'>
    <img className='w-[90%] h-[90%]' src={more} alt="" />
  </div>

  <div className='w-[6%] h-[15%] shadow-customShadow bg-white rounded-2xl  flex justify-center items-center absolute top-[3%] left-[32%] max-sm:rounded-lg max-[400px]:rounded-md   max-lg:rounded-xl cursor-pointer  hover:scale-110 transition-all duration-150'>
    <img className='w-[60%] h-[60%]' src={bigcommerce} alt="" />
  </div>
  <div className='w-[15%] h-[34%]  shadow-customShadow bg-white rounded-2xl  flex justify-center items-center text-3xl text-[#6C7477] font-medium absolute bottom-0 left-[4%] max-sm:rounded-lg max-md:text-xl max-[450px]:text-sm max-md:rounded-xl cursor-pointer  hover:scale-110 transition-all duration-150'>
    API
  </div>
 </div>
  <div className='w-full py-10  m-auto bg-[#bcddbe] rounded-2xl px-14  flex gap-2 justify-between items-center mt-40 max-md:px-8 max-[500px]:px-2'>
   <p className=' w-96 text-2xl text-green-800 font-semibold max-sm:text-lg max-[500px]:w-72 max-[500px]:text-sm'>Are you a large business looking for custom solutions?</p>
   <button className='w-36 h-10 text-[15px] rounded-md  text-[#464B57] bg-[#FFFFFF] border border-solid border-gray-300'>Talk to sale</button>
  </div>
  </div>
  
</>
  )
}

export default ConnectStore