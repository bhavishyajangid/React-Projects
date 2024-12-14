import React, { useEffect, useState } from "react";
import herosection from "../assets/herosection.jpg";
import { FaSearch } from "react-icons/fa";
import { setAllProfile, setLoader } from "../store/profileList";
import { useDispatch, useSelector } from "react-redux";
const HeroSection = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  // serch product by user input  
  useEffect(() => {
    const fetchProfile = async () => {
      dispatch(setLoader(true));
      try {
        const resposne = await fetch(
          `https://dummyjson.com/users/search?q=${inputValue}`
        );
        const res = await resposne.json();
        dispatch(setAllProfile(res.users));
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setLoader(false));
      }
    };

    // wait 500ms to reudce extra api call
    const debounseFetch = setTimeout(() => {
      fetchProfile();
    }, 500);

    // clear the debounce 
    return () => clearTimeout(debounseFetch);
  }, [inputValue, dispatch]);

  
  const handleInputValue = (value) => {
    setInputValue(value);
  };

  return (
    <div className="w-full relative ">
      <div>
        <img
          className="w-full h-[520px] max-lg:h-auto opacity-80 "
          src={herosection}
          alt="img"
        />
      </div>
      <div className=" w-full h-full absolute top-0 bg-transparent flex justify-center items-center mt-20 max-md:mt-14 ">
        <div className=" max-sm:w-4/5 rounded-lg px-5 py-3 bg-white">
          <h2 className="capitalize font-medium">Find the profile</h2>
          <div className="  pr-3  border-2 border-solid border-gray-500 rounded-lg overflow-hidden flex items-center justify-between mt-2">
            <input
              value={inputValue}
              onChange={(e) => {
                handleInputValue(e.target.value);
              }}
              className="w-96 h-10 px-3 outline-none"
              type="text"
            />
            <FaSearch className="text-xl text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
