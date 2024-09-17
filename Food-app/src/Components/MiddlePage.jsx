import React from "react";
import { Link } from "react-router-dom";

const MiddlePage = () => {
  console.log('middle page');
  
  return (
    <div className="w-5/6  m-auto  flex flex-col max-sm:w-full">

    
    <div className='w-full h-[60vh]  bg-[url("https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L2lzMTYwNjItaW1hZ2Uta3d2eWZrd3IuanBn.jpg")] bg-cover bg-center rounded-lg m-auto mt-8  items-center max-sm:w-11/12 max-md:h-[32vh]'>
      <div className="w-full h-full  pl-5 pr-28  flex flex-col justify-center ">
        <span className="text-7xl text-white  max-md:text-4xl ">
          Order your
        </span>
        <span className="text-7xl text-white max-md:text-4xl">
          favorite food here
        </span>

        <p className="text-white mt-3 leading-5 max-lg:hidden">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam culpa
          eveniet quia esse, dolore repellendus eaque. Provident eveniet autem
          minus commodi officia, tempora, vero ducimus totam ipsum, soluta
          sapiente? Corrupti?
        </p>
        <Link to="/menu">
        <button className="w-32  h-12 max-md:w-24 max-md:h-8 max-md:text-sm bg-orange-600 text-white mt-5 capitalize rounded-3xl">
          View menu
        </button>
        </Link>
      </div>
    </div>

      <div className="w-full  mt-10 max-sm:px-5 ">
        <h2 className="text-2xl capitalize ">expolre our menu</h2>
        <p className="text-gray-400 text-[16px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, nam.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis,
          accusamus. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Voluptate, deleniti.
        </p>
      </div>
    </div>
  );
};

export default MiddlePage;
