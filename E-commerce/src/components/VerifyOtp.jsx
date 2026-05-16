import React, { memo, useEffect, useRef, useState } from "react";
import Input from "./Input";
import useCountDown from "../hooks/useCountdown";

const VerifyOtp = ({validateOtp}) => {
  const [error, setError] = useState("");
  const userEnterOtp = useRef("");
  const [countDown, setCountDown] = useState();
  
  const {
    formattedTime,
    setSeconds
  } = useCountDown(60);

  useEffect(() => {
    setCountDown(formattedTime)
  } , [formattedTime])
 

  const checkOtp = () => {
    if (userEnterOtp.current.length < 6) {
      setError("Otp must be 6 digit");
    } else {
      setError("");
      validateOtp(userEnterOtp.current)
    }
  };

  const handleInput = (e) => {
    userEnterOtp.current = e.target.value.replace(/\D/g, "").slice(0, 6);
  };


  const handleResendOtp = () => {
    if(countDown == "00:00"){
      setSeconds(60)
    }
  }

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
          ref={userEnterOtp}
          onChange={(e) => {
            handleInput(e);
          }}
          type="number"
          placeholder="Enter Otp"
          name="otp"
          className="h-full w-full outline-none px-2 placeholder:text-sm"
        />
        <span
          onClick={() => {
            checkOtp()
          }}
          className="p-3 text-sm bg-gray-900 text-white flex items-center justify-center cursor-pointer"
        >
          Verify
        </span>
      </div>
      <div className="w-full flex justify-between items-center">
        

        <span>
          {
            countDown == "00:00" &&  <span className={`  text-xs text-gray-500 cursor-pointer`}  type="button" onClick={() => handleResendOtp()}>
          Resend Otp
        </span>
          }
        </span>
          
        {
            countDown != "00:00" &&  <span className="text-xs text-gray-500">{countDown }</span>
        }
       
      </div>
    </div>
  );
};

export default memo(VerifyOtp);
