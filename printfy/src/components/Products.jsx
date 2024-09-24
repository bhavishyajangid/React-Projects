import React from "react";
import clothes from "../assets/clothes.png";
import image1 from "../assets/img1.png";
import image2 from "../assets/img2.png";
import create from "../assets/createimg.png";
import { IoMdArrowForward } from "react-icons/io";
const Products = () => {
  return (
    <div className="w-full   min-h-96 bg-[#F7F7F7] pt-28 pb-10 px-8   ">
      <div className="w-11/12 max-w-[1280px] max-lg:w-3/4  m-auto h-full   flex items-center max-lg:flex-col max-sm:w-full rounded-2xl overflow-hidden ">
        <div className="w-[450px] h-full  bg-[#18C75A] rounded-3xl overflow-hidden max-lg:w-full max-lg:h-[300px] ">
          <img src={clothes} alt="" />
        </div>
        <div className="w-[800px] h-4/5  bg-white px-36  py-16 max-lg:w-full max-lg:px-5 max-lg:py-5">
          <h1 className="text-4xl font-medium  font-sans max-sm:text-3xl">
            Easily add your design to a wide range of products
          </h1>
          <p className="text-[#485256] leading-5 mt-5">
            With our free design tools, you can easily add your custom designs
            to t-shirts, mugs, phone cases, and hundreds of other products.
          </p>
          <span className="font-medium text-[#18C75A] inline-flex justify-center items-center cursor-pointer mt-20 max-lg:mt-5">
            All products <IoMdArrowForward className="text-2xl ml-2" />
          </span>
        </div>
      </div>

      <div className="w-11/12 max-w-[1280px] mt-32 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] m-auto gap-10 ">
        <div className="  min-h-60 p-5 rounded-xl max-lg:text-center max-md:px-20  max-sm:px-8">
            <img className="w-36 h-36 m-auto" src={image1} alt="" />
          <span className="text-lg text-[#18C75A] font-medium ">Create</span>
          <h1 className="text-2xl font-medium">coustom products</h1>
          <p className="text-sm leading-4 text-[#485256] mt-5">
            Easily add your designs to a wide range of products using our free
            tools
          </p>
        </div>

        <div className="  min-h-60 p-5 rounded-xl  max-lg:text-center max-md:px-20  max-sm:px-8">
         
            <img className="w-36 h-36 m-auto" src={image1} alt="" />
          
          <span className="text-lg text-[#18C75A] font-medium ">Create</span>
          <h1 className="text-2xl font-medium">coustom products</h1>
          <p className="text-sm leading-4 text-[#485256] mt-5">
            Easily add your designs to a wide range of products using our free
            tools
          </p>
        </div>

        <div className="  min-h-60 p-5 rounded-xl  max-lg:text-center max-md:px-20  max-sm:px-8 ">
            <img className="w-36 h-36 m-auto" src={image1} alt="" />

          <span className="text-lg text-[#18C75A] font-medium ">Create</span>
          <h1 className="text-2xl font-medium">coustom products</h1>
          <p className="text-sm leading-4 text-[#485256] mt-5">
            Easily add your designs to a wide range of products using our free
            tools
          </p>
        </div>
      </div>
    </div>
  );
};

export default Products;
