import React from 'react';
import { FaTelegram, FaDiscord, FaApple, FaAndroid, FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className=" text-[#fff] px-6 py-10 text-sm">
      <div className="max-w-screen-md mx-auto space-y-8">

        {/* Top Section */}
        <div className='text-[#6c6c70]'>
          <h1 className="text-xl font-semibold text-[#fff]">Bepjet</h1>
          <p className=" mt-2">Global Headquarters, bepjet AG</p>
          <p className="">Baarerstrasse 10, 6300 Zug, Switzerland</p>
          <p className=" block mt-2">support@bepjet.com</p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-[#6c6c70] text-lg">
          <FaTelegram />
          <FaDiscord />
          <FaApple />
          <FaAndroid />
          <FaInstagram />
          <FaFacebookF />
          <FaLinkedinIn />
          <FaYoutube />
        </div>

        {/* Link Sections */}
        <div className="flex justify-between gap-8 text-[#6c6c70]" >
          <div className="space-y-1">
            <h2 className="text-[#fff] font-semibold mb-2">Company</h2>
            {['About Bepjet', 'International Delivery', 'Resellers', 'Affiliates', 'Customize your wallet', 'Blog', 'Roadmap', 'Media Kit', 'Bepjet Guide'].map((link, idx) => (
              <p key={idx} className="text-[#6c6c70]">{link}</p>
            ))}
          </div>
          <div className="space-y-1">
            <h2 className="text-[#fff] font-semibold mb-2">Legal</h2>
            {['Terms of Use', 'Privacy Policy', 'Las Vegas Terms & Conditions'].map((link, idx) => (
              <p key={idx} className="text-[#6c6c70]">{link}</p>
            ))}
          </div>
        </div>

        {/* Legal Text */}
        <div className="text-[10px] text-[#6c6c70] mt-6 leading-snug">
          <p>Reg. No: CHE-202.118.235</p>
          <p className="mt-2">Bepjet AG provides only information and non-custodial software solutions. Bepjet is not a financial institution or intermediary, does not provide financial services, and is not a party to any transaction between users.</p>
          <p className="mt-2">Bepjet does not collect, store, or share user data. Tangem cards work independently of the Bepjet app. By using this website, you accept our Terms of Use and Privacy Policy.</p>
          <p className="mt-2">Copyright © 2025 Bepjet AG. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
