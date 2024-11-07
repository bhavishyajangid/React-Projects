import React from "react";
import Subscription from "./Subscription";
import aboutimg from '../assets/about.png'
const About = () => {
  return (
    <>
    <div className="w-4/5 m-auto max-lg:w-11/12">
      <div class="text-2xl text-center pt-8 border-t">
        <div class="inline-flex gap-2 items-center mb-3">
          <p class="text-gray-500">
            ABOUT <span class="text-gray-700 font-medium">US</span>
          </p>
          <p class="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
        </div>
      </div>
      <div class="my-10 flex flex-col md:flex-row gap-16">
        <img
          class="w-full md:max-w-[450px]"
          src={aboutimg}
          alt=""
        />
        <div class="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>

          <p>
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>
          <b class="text-gray-800">Our Mission</b>
          <p>
            Our mission at Forever is to empower customers with choice,
            convenience, and confidence. We're dedicated to providing a seamless
            shopping experience that exceeds expectations, from browsing and
            ordering to delivery and beyond.
          </p>
        </div>
      </div>
      <div class="w-full m-auto  md:flex-row text-sm mb-20 ">
        <div class=" text-xl py-4 ">
          <div class="inline-flex gap-2 items-center mb-3">
            <p class="text-gray-500 ">
              WHY <span class="text-gray-700 font-medium">CHOOSE US</span>
            </p>
            <p class="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
          </div>
        </div>
        <div className="w-full flex">
          <div class="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Quality Assurance:</b>
            <p class=" text-gray-600">
              We meticulously select and vet each product to ensure it meets our
              stringent quality standards.
            </p>
          </div>
          <div class="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Convenience:</b>
            <p class=" text-gray-600">
              With our user-friendly interface and hassle-free ordering process,
              shopping has never been easier.
            </p>
          </div>
          <div class="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Exceptional Customer Service:</b>
            <p class=" text-gray-600">
              Our team of dedicated professionals is here to assist you the way,
              ensuring your satisfaction is our top priority.
            </p>
          </div>
        </div>
      </div>
    </div>
    <Subscription/>
    </>
  );
};

export default About;
