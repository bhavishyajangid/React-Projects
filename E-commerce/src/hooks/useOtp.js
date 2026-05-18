// hooks/useOtp.js

import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import authService from "../appwrite/auth";

const useOtp = () => {
  const [otpStatus, setOtpStatus] = useState("idle");
  const [generatedOtp , setGeneratedOtp] = useState(null)
  const [error , setError] = useState("");
  // idle
  // sending
  // sent
  // verifying
  // verified
  // error

  const [seconds, setSeconds] = useState(0);

  // ================= SEND OTP =================

  const sendOtp = useCallback(async (data) => {
    try {
      setOtpStatus("sending");
     const otp =  await authService.sendOtp(data);
     console.log("Generated OTP:", otp);
     setGeneratedOtp(otp)

      setOtpStatus("sent");

      setSeconds(60);
      
      toast.success("Otp sent successfully");
    } catch (error) {
      setOtpStatus("error");

      toast.error(error.message || "Failed to send otp");
    }
  }, []);

  // ================= VERIFY OTP =================

  const verifyOtp = useCallback(async (generatedOtp,userOtp) => {
   console.log({userOtp , generatedOtp})
     if(userOtp <= 6 || userOtp === ""){
      setError("Please enter 6 digit otp")
      return
    };

    try {
      setOtpStatus("verifying");

      const response = await authService.verifyOtp(generatedOtp, userOtp);

      if (response) {
        setOtpStatus("verified");

        toast.success("Otp verified successfully");

        return true;
      }

      setOtpStatus("sent");

      toast.error("Invalid otp");

      return false;
    } catch (error) {
      setOtpStatus("sent");

      toast.error(error.message || "Otp verification failed");

      return false;
    }
  }, []);

  // ================= RESEND OTP =================

  const resendOtp = useCallback(async () => {
    if (seconds > 0) return;

    await sendOtp();
  }, [seconds, sendOtp]);

  // ================= TIMER =================

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  // ================= FORMATTED TIME =================

  const formattedTime = `00:${String(seconds).padStart(2, "0")}`;

  return {
    sendOtp,
    verifyOtp,
    resendOtp,


    formattedTime,

    showOtpField:
      otpStatus === "sent" ||
      otpStatus === "verifying" ||
      otpStatus === "verified",

    otpVerified: otpStatus === "verified",

    otpLoading:
      otpStatus === "sending" ||
      otpStatus === "verifying",

    formLocked : otpStatus === "sent" ,
error,
      generatedOtp
  };
};

export default useOtp;