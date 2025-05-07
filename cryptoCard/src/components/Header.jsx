import React from 'react'
import video from '../../public/hero-video.mp4'
const Header = () => {
  return (
    <>
    <div className="h-[450px]">
    <video
      src={video}
      autoPlay
      muted
      className="w-full h-full object-cover "
    ></video>
  </div>

  {/* Text section — remaining 47% */}
  <div className="flex-1 w-full text-[#f0f0f0] px-9 py-4">
    <p className="text-5xl font-semibold leading-[3.5rem] text-center">
      <span className="bg-[linear-gradient(to_right,_#6c6c70,_#f0f0f0)] bg-clip-text text-transparent">
        Bepjet
      </span>{' '}
      —  Your Secure Crypto & Hardware Wallet

    </p>
    <p className="mt-3 text-[#6c6c70] text-lg font-semibold text-center">
      Store, buy, earn, swap, and manage thousands of cryptocurrencies seamlessly from a single, card-sized device — no apps, no cables, no worries.
    </p>

    <div className='flex justify-around items-center mt-12 '>
      <span className='text-[#6c6c70] text-lg font-semibold'>From $54.90</span>
      <button className='bg-[linear-gradient(to_right,_#66ccffb3,_#09f)] text-white px-8 py-2 text-lg font-semibold rounded-xl '>Launch Wallet</button>
    </div>
  </div>
  </>
  )
}

export default Header