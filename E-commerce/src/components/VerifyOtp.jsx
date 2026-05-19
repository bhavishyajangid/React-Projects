import React, { memo, useEffect, useRef, useState } from "react";
import Input from "./Input";
import useCountDown from "../hooks/useCountdown";
import useOtp from "../hooks/useOtp";

const VerifyOtp = ({validateOtp , resendOtp , formattedTime , error , generatedOtp}) => {
  const userEnterOtp = useRef("");
console.log(formattedTime , 'form')


  const handleInput = (e) => {
    userEnterOtp.current = e.target.value
  }

  console.log(formattedTime , 'timer')

  return (
    <div className="flex flex-col gap-2 items-start">
      <div className="flex gap-2 items-start">
        <label htmlFor={"otp"} className="text-sm capitalize">
          Otp
        </label>
        {error && <p className="text-red-600 text-xs">{error}</p>}
      </div>

      <div className="w-96 h-10 border border-black border-solid flex">
        <input
  type="text"
  placeholder="Enter OTP"
  name="otp"
  maxLength={6}
  minLength={6}
  onChange={(e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
    handleInput(e);
  }}
  className="h-full w-full outline-none px-2 placeholder:text-sm"
/>
        <span
          onClick={() => {
            console.log(generatedOtp , 'gener')
            validateOtp(generatedOtp.current, userEnterOtp.current)
          }}
          className="p-3 text-sm bg-gray-900 text-white flex items-center justify-center cursor-pointer"
        >
          Verify
        </span>
      </div>
      <div className="w-full flex justify-between items-center">
      
      
         <button
        onClick={() => {resendOtp()}}
    className={`${formattedTime === "00:00" ? "opacity-100" : "opacity-0"} text-xs text-gray-500 `}
      >
        Resend Otp
      </button>
      
        
 {
    formattedTime !== "00:00"  &&
      <span className="text-xs text-gray-500">
        {formattedTime}
      </span>
    
  }
       
      </div>
    </div>
  );
};

export default memo(VerifyOtp);
