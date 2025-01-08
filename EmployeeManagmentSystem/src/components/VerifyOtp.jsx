import React from "react";
import Input from "./Input"; // Adjust the import path for Input component


const VerifyOtp = ({second , emailOtp ,verifyEmailOtp, resendOtp}) => {
    // take data using context api
  
  
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
            onClick={verifyEmailOtp}
            className="px-3 py-1 rounded-md bg-blue-600 text-white"
          >
            Submit
          </button>
          {second !== 0 ? (
            <span className="px-2 py-1 font-medium mt-1">{second}</span>
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
