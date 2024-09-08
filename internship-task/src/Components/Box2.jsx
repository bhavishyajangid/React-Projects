import React, { useRef, useState } from "react";
import question from "../assets/question.png";
import square from "../assets/square.png";
import addImg from "../assets/addimg.png";
import leftBtn from "../assets/leftBtn.png";
import rightBtn from "../assets/rightBtn.png";
import Image from "./Image";
const Box2 = () => {
  const inputFile = useRef(null);
  const imageContainer = useRef(null);
  const [imageUrl, setImageUrl] = useState([
    {
      url: "https://archive.org/download/img-world-ticket-offers/yvA5SpUH-IMG-Worlds-1200x800.jpg",
    },
    {
      url: "https://archive.org/download/img-world-ticket-offers/yvA5SpUH-IMG-Worlds-1200x800.jpg",
    },
    {
      url: "https://archive.org/download/img-world-ticket-offers/yvA5SpUH-IMG-Worlds-1200x800.jpg",
    },
  ]);

  // add selected img to the state
  const uploadImg = () => {
    const imgUrl = URL.createObjectURL(inputFile.current.files[0]);
    setImageUrl([{ url: imgUrl }, ...imageUrl]);
  };

  // making right scroll funcationlity
  const scrollRight = () => {
    imageContainer.current.scrollBy({ left: 210, behavior: "smooth" });
  };

  // making left scroll funcationlity
  const scrollLeft = () => {
    imageContainer.current.scrollBy({ left: -210, behavior: "smooth" });
  };

  return (
    <div className="w-full 2xl:w-[720px] 2xl:mt-3 h-1/2  2xl:ml-20  flex  flex-col  items-center  max-xl:w-[48%] max-xl:h-[325px]  max-xl:mt-0 max-lg:w-11/12  ">
      <div className="w-full 2xl:w-[720px] h-[280px] 2xl:h-[330px]  bg-[#363C43] shadow-boxFirstShadow rounded-[19px] max-xl:h-[300px]  py-4 px-3 flex relative  ">
        <div className="w-5 h-40 max-w-6 flex flex-col justify-between items-center">
          <img className="w-5 h-5 max-w-6 max-h-6" src={question} alt="" />
          <img
            className="w-5 h-[30px] max-w-6  rounded-[3px]"
            src={square}
            alt="img"
          />
        </div>

        <div className="w-[90%]  2xl:w-[614px] h-full ml-[18px]   flex flex-col   ">
          <div className="w-full h-[50px] 2xl:h-[62px] items-center flex justify-between  ">
            <div className="w-[110px] h-[50px] 2xl:w-[149px] 2xl:h-[62px] rounded-[20px] bg-[#171717] shadow-galleryShadow font-poppins font-medium text-[16px] 2xl:text-[20px] text-[#FFFFFF] flex justify-center items-center">
              Gallery
            </div>
            <div className=" flex gap-8  ">
              <label
                for="input-img"
                className="w-[110px] h-[40px] 2xl:w-[131px] 2xl:h-[46px] rounded-[20px] bg-[#ffffff08] shadow-addBtn text-[#FFFFFF] font-poppins font-medium  text-xs  2xl:text-[14px] flex justify-center gap-1 items-center cursor-pointer"
              >
                <img className="w-[12px] h-[12px]  " src={addImg} alt="" />
                <span>ADD IMAGE</span>
                <input
                  className="hidden"
                  accept="image/jpeg , image/png , /image/jpg "
                  ref={inputFile}
                  onChange={uploadImg}
                  type="file"
                  id="input-img"
                />
              </label>

              <div className="flex gap-3 items-center">
                <button
                  onClick={scrollLeft}
                  className=" w-[38px] h-[38px] 2xl:w-[45px] 2xl:h-[45px] bg-rightBtn shadow-rightBtn rounded-full flex justify-center items-center"
                >
                  <img
                    className="w-[14.19px] h-[14px]"
                    src={leftBtn}
                    alt="img"
                  />
                </button>
                <button
                  onClick={scrollRight}
                  className=" w-[38px] h-[38px] 2xl:w-[45px] 2xl:h-[45px] bg-rightBtn shadow-rightBtn rounded-full flex justify-center items-center"
                >
                  <img className="w-[14.19px] h-[14px]" src={rightBtn} alt="" />
                </button>
              </div>
            </div>
          </div>
          <div
            ref={imageContainer}
            className="w-full h-full  flex items-end overflow-x-scroll px-2 pb-2  "
            id="image"
          >
            <div className="flex gap-4  ">
              {imageUrl.map((item, index) => (
                <Image item={item} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className=" w-[90%] 2xl:w-[612px]  h-[4px] bg-bigLine shadow-bigLine rounded-[3px]   mt-3"></div>
    </div>
  );
};

export default Box2;
