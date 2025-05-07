import React from 'react';
import img from '../../public/stone.png'
const PrivateKey = () => {
  return (
    <>
    <div className=" text-white px-5 py-10 space-y-6 mt-10 ">
     <h1 className='text-[35px] text-[#fff] font-semibold'> <span className='bg-[linear-gradient(to_right,_#6c6c70,_#f0f0f0)] bg-clip-text text-transparent'>End-to-End </span> Private Key Integrity.</h1>

      <p className="text-[#6c6c70] text-lg font-semibold ">
      Advanced technology engineered for unmatched protection.
      </p>

<div className='flex flex-col gap-8 mt-10'>


      <div className="flex gap-3 ">
        <img className='w-16 h-14 ' src="../../public/one.jpg" alt="img" />

        <p className="text-sm text-[#6c6c70] leading-relaxed">
        Each device <span className="font-semibold text-[#fff]"> creates a unique, non-recoverable.</span>. cryptographic key
        </p>
      </div>

      <div className="flex gap-3">
      <img className='w-16 h-14 ' src="../../public/two.jpg" alt="img" />
        <p className="text-sm leading-relaxed text-[#6c6c70]">
        A secure channel is
          <span className="font-semibold text-[#fff]">  established to transmit your encrypted </span> credentials.
        </p>
      </div>

      <div className="flex  gap-3">
      <img className='w-16 scale-110 h-14 ml-2' src="../../public/three.jpg" alt="img" />
        <p className="text-sm leading-relaxed text-[#6c6c70]">
        Keys remain solely on the chip, <span className="font-semibold text-[#fff]">with zero backups or cloud storage no other copies</span> exist across space and time.
        </p>
      </div>
      </div>
    </div>
<div className='w-full h-60 relative  mb-12'>
<hr className="h-[1.5px] w-full bg-gradient-to-r from-black via-gray-500  to-black border-0 transform scale-y-[0.5]" />
    <img className='w-full h-full' src="../../public/stone.png" alt="" />
    <div className='w-full h-full  absolute bg-transparent top-0 flex flex-col justify-center items-center text-center '>
        <h1 className='text-3xl text-[#fff] font-semibold'>Zero Out Of 
          <br />
          2,000,000</h1>
        <p className='bg-[linear-gradient(to_right,_#6c6c70,_#f0f0f0)] bg-clip-text text-transparent '>cards hacked since creation</p>
       
    </div>
    <hr className="h-[1.5px] w-full bg-gradient-to-r from-black via-gray-500  to-black border-0 transform scale-y-[0.5]" />
</div>
</>
  );
};

export default PrivateKey;
