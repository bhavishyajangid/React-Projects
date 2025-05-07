import React, { useRef, useState, useEffect } from 'react';
import ScrollData from './ScrollData';

const scrollItems = [
  {
  id: 1,
  title: "Stake & Earn",
  text: "Earn passive income by staking your crypto directly on BEPJET. Let your assets grow while you hold.",
  badge: "Passive",
  image: "../../../public/img1.png",
  },
  {
  id: 2,
  title: "Auto Staking",
  text: "Enable automatic staking and compounding to maximize returns without manual effort.",
  badge: "Smart",
  image: "../../../public/img2.png",
  },
  {
  id: 3,
  title: "Flexible Lock",
  text: "Choose between flexible or fixed staking terms. Unlock anytime or stake long-term for higher rewards.",
  badge: "Flexible",
  image: "../../../public/img3.png",
  },
  {
  id: 4,
  title: "Multi-Token Staking",
  text: "Stake a variety of tokens including BEPJET, ETH, USDT, and more—all from one dashboard.",
  badge: "Diverse",
  image: "../../../public/img4.png",
  },
  {
  id: 5,
  title: "Tiered Rewards",
  text: "The more you stake, the more you earn. Unlock exclusive tiers with enhanced APY and perks.",
  badge: "Premium",
  image: "../../../public/img5.png",
  },
  {
  id: 6,
  title: "Secure Protocols",
  text: "All staking operations are secured by audited smart contracts, ensuring transparency and trust.",
  badge: "Secure",
  image: "../../../public/img6.png",
  }
  ];

const ScrollComponent = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const scrollLeft = scrollRef.current.scrollLeft;
    const width = scrollRef.current.clientWidth;
    const index = Math.round(scrollLeft / width);
    setActiveIndex(index);
  };

  useEffect(() => {
    const ref = scrollRef.current;
    ref.addEventListener('scroll', handleScroll);
    return () => ref.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full mt-20 flex flex-col gap-5">
      {/* Image Section */}
      <div className="w-full h-96  ">
        <img
          src={scrollItems[activeIndex].image}
          alt="Dynamic"
          className="w-full h-full object-contain rounded-lg"
        />
           <hr className="h-[1.5px] w-full bg-gradient-to-r from-black via-gray-500   to-black border-0 transform scale-y-[0.5] mt-2" />
      </div>

      {/* Scrollable Section */}
      <div
        className="w-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none mt-8"
        ref={scrollRef}
      >
        {scrollItems.map((item) => (
          <div
            key={item.id}
            className=" snap-start flex-shrink-0 px-5"
          >
            <ScrollData item={item} />
          </div>
        ))}
      </div>

      {/* Indicator Line */}
      <div className="flex justify-center mb-5 gap-2">
        {scrollItems.map((_, idx) => (
          <div
            key={idx}
            className={`h-[1.5px] w-12 rounded-full transition-all duration-300 ${idx === activeIndex ? 'bg-[#fff]' : 'bg-gray-500'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollComponent;
