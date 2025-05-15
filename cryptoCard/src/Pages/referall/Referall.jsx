import React from 'react'
import Heading from '../../components/Heading'
import ReferallBox from './components/referallBox';
const Referall = () => {

  const referralData = [
    {
      icon: '/referallcard1',
      text: 'Provide the best value by offering discounts on Tangem Wallets.',
    },
    {
      icon: '/referallcard2', 
      text: 'We pay referral fees directly to your Tangem Wallet.',
    },
    {
      icon: '/referallcard3',
      text: 'Get a commission for every successful referral, and enjoy a stream of passive income.',
    },
    {
      icon: '/referallcard4',
      text: 'Tangem ships worldwide, allowing you to invite anyone, anywhere, to buy through your referral link.',
    },
    {
      icon: '/referallcard5',
      text: "Get started quickly—just grab your link, share it, and start earning without any complex setup."
    },
    {
      icon: '/referallcard6',
      text: "Access real-time stats to see how your referrals are performing and how much you’ve earned."
    }
  ];

  
  return (
    <div className='w-full bg-black text-[#6c6c70]'>
      <Heading heading={"Refer and earn with the Bepjet referall program."} />
      <p className='text-md font-medium text-center mt-10'>Get a unique referral link, share it with your friends and audience, and <span className='text-[#fff]'>earn from every purchase.</span></p>
        
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
      {referralData.map((item, index) => (
          <ReferallBox
          item={item}
          key={index}
          />
      ))}
    </div>
    </div>
  )
}

export default Referall