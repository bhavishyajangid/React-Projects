import React, { useEffect, useState } from "react";
import authServices from "../../Appwrite/Auth";
import { useNavigate } from "react-router";
import emailjs from "emailjs-com";
const VerifyEmail = () => {
 

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000);
  };


  handleOtpSubmit = () => {
    const otpCode = generateOtp();

    const templateParams = {
      to_email: data.email,
      otp: otpCode,
    };
    //  emailjs.init('V6RgthY8oQceVRjcO');
    emailjs
      .send(
        "service_lsyugp9",
        "template_jxaqwnp",
        templateParams,
        "V6RgthY8oQceVRjcO"
      ) // Replace with your EmailJS credentials
      .then((response) => {
          console.log("OTP sent successfully", response);
          alert("OTP sent to your email!");
        },
        (error) => {
          console.log("Error sending OTP", error);
          alert("Failed to send OTP. Please try again!");
        }
      );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#111111]">
      <div className="text-center p-5">
        <h2 className="text-2xl font-semibold">Please Verify Your Email</h2>
        <p className="text-sm text-gray-600">
          We have sent you a verification email. Please check your inbox and
          click on the link to verify your email.
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
