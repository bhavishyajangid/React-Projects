import React from "react";
import Input from "./Input"; // Adjust the import path for Input component
import { useOtpTimer } from "../utlity/hook/useOtpTime";


const VerifyOtp = ({second , VerifyOtp , resendOtp , emailOtp }) => { 
  return (
    <div>
      
        <div className="flex gap-3">
          <Input
            ref={emailOtp}
            placeholder="OTP"
            maxLength="6"
            divClass="w-20 h-8"
          />
          <button
            type="button"
            onClick={VerifyOtp}
            className="px-3 py-1 rounded-md bg-blue-600 text-white"
          >
            Submit
          </button>
          {second !== 0 ? (
            <span className="px-2 py-1 font-medium mt-1">{time}</span>
          ) : (
            <button
              type="button"
              onClick={resendOtp}
              className="px-4 py-1 rounded-md bg-green-600 text-white"
            >
              Resend
            </button>
          )}
        </div>
      
    </div>
  );
};

export default VerifyOtp;
