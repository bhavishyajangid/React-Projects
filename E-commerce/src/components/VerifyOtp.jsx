import React, { memo, useEffect, useRef, useState } from "react";
import Input from "./Input";
import useCountDown from "../hooks/useCountdown";
import useOtp from "../hooks/useOtp";

const VerifyOtp = () => {
  const userEnterOtp = useRef("");
  const [countdown, setCountdown] = useState(0);
 const {
  verifyOtp,
  resendOtp,
  formattedTime,
  error,
  generatedOtp
} = useOtp();


useEffect(() => {
  setCountdown(formattedTime)
} , [formattedTime])


  const handleInput = (e) => {
    userEnterOtp.current = e.target.value
  }

  console.log(generatedOtp , "verifying otp")

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
            verifyOtp(generatedOtp, userEnterOtp.current)
          }}
          className="p-3 text-sm bg-gray-900 text-white flex items-center justify-center cursor-pointer"
        >
          Verify
        </span>
      </div>
      <div className="w-full flex justify-between items-center">
      
        <span>
          {
            countdown == "00:00" &&  <span className={`  text-xs text-gray-500 cursor-pointer`}  type="submit">
          Resend Otp
        </span>
          }
        </span>
          
        {
            countdown != "00:00" &&  <span className="text-xs text-gray-500">{countdown }</span>
        }
       
      </div>
    </div>
  );
};

export default memo(VerifyOtp);
