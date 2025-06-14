import React, { useRef  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useOtpTimer } from "../utlity/hook/useOtpTime";
import Input from "./Input"; // Adjust the import path for Input component
import { setResend, setUserEmailVerify } from "../Store/otpSendSlice";

const VerifyOtp = React.memo(({generatedOtp}) => { 
  const dispatch = useDispatch()
  const second = useOtpTimer()
  const emailOtp = useRef(null)
  const {resend} = useSelector(state => state.otpSendSlice)
console.log('chld');

    const verifyEmailOtp = async() => {
      console.log(generatedOtp , emailOtp.current.value , 'varify');
      
      if(parseInt(generatedOtp) === parseInt(emailOtp.current.value)){
       dispatch(setUserEmailVerify(true)) 
       toast.success("OTP Verified!");
      }else{
      toast.error("Invalid OTP, please try again.");
    }
    
  };

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
            onClick={() => {verifyEmailOtp()}}
            className="px-3 py-1 rounded-md bg-blue-600 text-white"
          >
            Submit
          </button>
          {second !== 0 ? (
            <p className="text-xs text-gray-700 ">
              {second > 0 ? `Resend OTP in ${second}s` : "Didn’t receive OTP?"}
          </p>
          ) : (
            <button
              type="button"
              onClick={() => {dispatch(setResend(!resend))}}
              className="px-4 py-1 rounded-md bg-green-600 text-white"
            >
              Resend
            </button>
          )}
        </div>
      
    </div>
  );
})

export default VerifyOtp;
