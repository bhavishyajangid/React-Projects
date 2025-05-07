import React from 'react'
import { useState } from 'react';
import PlusBtn from './btn/PlusBtn';
import FaqQuestionAns from './FaqQuestionAns';
const FAQ = () => {
    
    const faqs = [
        {
          question: "What is BEPJET and how does it work?",
          answer:
            "BEPJET is a crypto-based platform offering debit cards that let you spend your cryptocurrency directly at online and offline merchants. It connects seamlessly with wallets like MetaMask and Trust Wallet, allowing instant payments and rewards.",
        },
        {
          question: "Do I need KYC to use BEPJET cards?",
          answer:
            "No KYC is required. You can connect your decentralized wallet such as MetaMask or Trust Wallet to access all card features while maintaining complete control of your funds.",
        },
        {
          question: "What are the different card tiers and their benefits?",
          answer:
            "BEPJET offers Jet Lite, Jet Silver, and Jet Black cards. Each tier comes with increasing benefits such as higher spending limits, cashback rewards, NFT airdrops, airport lounge access, and more.",
        },
        {
          question: "How do BEPPOINTS work?",
          answer:
            "BEPPOINTS are loyalty rewards you earn by using your BEPJET card. Points can be redeemed for crypto tokens, NFTs, exclusive offers, or discounts from our partner platforms.",
        },
        {
          question: "Is BEPJET card accepted worldwide?",
          answer:
            "Yes, BEPJET cards are accepted globally anywhere major debit cards are accepted. The crypto is converted in real-time into fiat at competitive rates during the transaction.",
        },
        {
          question: "Can I top up my BEPJET card with fiat or only crypto?",
          answer:
            "BEPJET is designed for crypto-first users. You top up your card by transferring supported cryptocurrencies from your wallet. Fiat top-up options may be introduced in the future.",
        },
        {
          question: "Is there a mobile app for BEPJET?",
          answer:
            "No, currently there is no mobile app available. However, it may be launched in the future as the platform evolves",
        },
      ];
      
    const [activeIndex , setActiveIndex] = useState(null)
    const toggleDropdown = (index) => {
      setActiveIndex(activeIndex === index ? null : index);
    };
  return (
    <div className="bg-black text-[#fff] w-full px-8 mt-10 py-4">

<h2 className="text-2xl  font-bold mt-5 "><span className=" bg-[linear-gradient(to_right,_#6c6c70,_#f0f0f0)] bg-clip-text text-transparent">Frequently</span> Asked Question</h2>

{
         faqs.map((faq , index) => (
            <FaqQuestionAns key={index}  activeIndex={activeIndex} toggleDropdown={toggleDropdown} faq={faq} index={index}/>
         ))
}
   




  </div>
  )
}

export default FAQ