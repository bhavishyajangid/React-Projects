import React from "react";
import Subscription from "./Subscription";
import contactImg from "../assets/contact.png";
const Contactus = () => {
  return (
    <>
      <div className="w-4/5 m-auto max-lg:w-11/12">
        <div class="text-center text-2xl pt-10 border-t">
          <div class="inline-flex gap-2 items-center mb-3">
            <p class="text-gray-500">
              CONTACT <span class="text-gray-700 font-medium">US</span>
            </p>
            <p class="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
          </div>
        </div>
        <div class="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
          <img class="w-full md:max-w-[480px]" src={contactImg} alt="" />
          <div class="flex flex-col justify-center items-start gap-6">
            <p class="font-semibold text-xl text-gray-600">Our Store</p>
            <p class=" text-gray-500">
              54709 Willms Station <br /> Suite 350, Washington, USA
            </p>
            <p class=" text-gray-500">
              Tel: (415) 555-0132 <br /> Email: admin@forever.com
            </p>
            <p class="font-semibold text-xl text-gray-600">
              Careers at Forever
            </p>
            <p class=" text-gray-500">
              Learn more about our teams and job openings.
            </p>
            <button class="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
              Explore Jobs
            </button>
          </div>
        </div>
        
      </div>
      <Subscription />
    </>
  );
};

export default Contactus;
