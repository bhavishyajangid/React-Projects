// hooks/useOtp.js

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import authService from "../appwrite/auth";

const useOtp = (data  , formLocked) => {
  const abortRef = useRef(null);
  const [otpLoading , setOtpLoading] = useState(false);
  const [allSettings, setAllSettings] = useState({
    generatedOtp: "",
    otpStatus: "idle",
    seconds: 0,
  });

  

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  // ================= SEND OTP =================

  const sendOtp = useCallback(
    async (data) => {
      try {
        setOtpLoading(true);
        // Abort previous pending request
        abortRef.current?.abort();

        // Create new controller
        abortRef.current = new AbortController();

        const otp = await authService.sendOtp(
          data,
          abortRef.current.signal
        );

        setAllSettings((prev) => ({
          ...prev,
          generatedOtp: otp,
          otpStatus: "sent",
          seconds: 60,
        }));

        toast.success("Otp sent successfully");
      } catch (error) {
        // Ignore aborted request errors
        if (error.name === "AbortError") {
          console.log("Request aborted");
          return;
        }

        toast.error(error.message || "Failed to send otp");
      }finally{
        setOtpLoading(false);
      }
    },
    []
  );

  // ================= VERIFY OTP =================

  const validateOtp = useCallback(
    async (generatedOtp, userOtp) => {
    

      setOtpLoading(true);
      try {
        const response = await authService.verifyOtp(
          generatedOtp,
          userOtp
        );

        if (response) {
          setAllSettings((prev) => ({
            ...prev,
            otpStatus: "verified",
            seconds: 0,
          }));

          toast.success("Otp verified successfully");

          return true;
        }

        toast.error("Invalid otp");

        return false;
      } catch (error) {
        toast.error(error.message || "Otp verification failed");

        return false;
      }finally{
        setOtpLoading(false);
      }
    },
    []
  );

  // ================= RESEND OTP =================

  const resendOtp = useCallback(async () => {
    if (allSettings.seconds > 0) return;

    await sendOtp(data);
  }, [allSettings.seconds, sendOtp, data]);

  // ================= TIMER =================

  useEffect(() => {
    if (allSettings.seconds <= 0) return;

    const timer = setInterval(() => {
      setAllSettings((prev) => ({
        ...prev,
        seconds: prev.seconds - 1,
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [allSettings.seconds]);

  

  const formattedTime = `00:${String(
    allSettings.seconds
  ).padStart(2, "0")}`;

  // ================= RETURN =================



  return {
    sendOtp,
    validateOtp,
    resendOtp,

    formattedTime,

    otpVerified:
      allSettings.otpStatus === "verified",

    showOtpField:
      allSettings.otpStatus === "sent",

    otpLoading,
    formLocked :  allSettings.otpStatus === "verified"
    ? true
    : allSettings.otpStatus === "sent"
      ? true
      : otpLoading
        ? true
        : false,
    generatedOtp: allSettings.generatedOtp,
  };
};

export default useOtp;