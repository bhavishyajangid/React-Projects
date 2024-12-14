import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
// Assuming you're using a custom Input component
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button, Input, Login } from "../../export";
import authServices from "../../Appwrite/Auth";
import { useDispatch } from "react-redux";
import { login } from "../../Store/authSlice";
import emailjs from "emailjs-com";
const Signup = () => {
  // Destructure necessary methods from useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const Dispatch = useDispatch();
  const navigate = useNavigate();
  const password = watch("password");
  const [second, setSecond] = useState(0);
  const [otpSend, setOtpSend] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [userData , setUserData] = useState(null)
  const [resend , setResend] = useState(false)
  const [userVerifyStatus , setUserVerifyStatus] = useState({isEmailVerif : false , isNumberVerify : false})
  const emailOtp = useRef(null);
  const phoneOtp = useState(null);
  // const email = useRef(null);

  // Submit handler function
    
    const handleSignup = async (data) => {
       setUserData(data)
       
      if (!userVerifyStatus.isEmailVerif && !userVerifyStatus.isNumberVerify) {
        console.log("not true");
        setSecond(60)
        setOtpSend(true);
      } else {
        try {
          const newUser = await authServices.createAccount(data);
          if (newUser) {
            const currentUser = await authServices.getCurrentUser();
            Dispatch(login(currentUser));
            navigate("/");
            console.log(currentUser);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };




    useEffect(() => {

      const OtpSent = async() => {
        console.log(userData);
        
        
        
        const otpCode = Math.floor(100000 + Math.random() * 900000);
    
        // const templateParams = {
        //   to_email: userData.email,          // The recipient's email
        //   to_name: userData.name,          // The recipient's name
        //   from_name: "The Manager",      // The sender's name
        //   message: `Your OTP code is: ${otpCode}`
        // };
    
    
        //  emailjs.init('V6RgthY8oQceVRjcO');
        // emailjs
        //   .send(
        //     "service_lsyugp9",
        //     "template_jxaqwnp",
        //     templateParams,
        //     "V6RgthY8oQceVRjcO"
        //   ) // Replace with your EmailJS credentials
        //   .then(
        //     (response) => {
        //       if (response) {
        //         console.log("OTP sent successfully", response);
        //         alert("OTP sent to your email!");
        //         setOtpSend(true);
        //         setGeneratedOtp(otpCode);
        //       }
        //     },
        //     (error) => {
        //       console.log("Error sending OTP", error);
        //       alert("Failed to send OTP. Please try again!");
        //     }
        //   );
          


    try {
      const response = await fetch('http://localhost:5000/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: "+917378205458" }),
      });

      const data = await response.json();

      if (data.success) {
        alert('OTP sent to your phone!');
      } else {
        console.log(data);
        
        alert('Failed to send OTP.');
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending OTP.");
    }
  };
      

      
      OtpSent()
    } , [otpSend , resend])

  const varifyEmailOtp = () => {
    if (parseInt(emailOtp.current.value) === parseInt(generatedOtp)) {
      alert("OTP Verified!");
      setUserVerifyStatus({isEmailVerif : true})
    } else {
      alert("Invalid OTP, please try again.");
    }
  };


  const verifyNumberOtp = async () => {
    if (!phoneOtp) {
      alert('Please enter OTP');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: userData.phone,
          otp: phoneOtp,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('OTP Verified!');
      } else {
        alert('Invalid OTP');
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while verifying OTP.");
    }
  };
  
  useEffect(() => {
    if (second == 0) return;

    const timer = setInterval(() => {
      setSecond((prev) => prev > 0 ? prev - 1 : prev);
    }, 1000);

    return () => clearInterval(timer);
  }, [otpSend, resend]);

  const reSendOtp = () => {
     setSecond(60);
     setResend(prev => !prev)
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#111111]">
      <form
        className="p-5 flex flex-col gap-3 rounded-lg shadow-lg w-96 bg-[#1C1C1C]"
        onSubmit={handleSubmit(handleSignup)}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

        {/* Username Input */}
        <Input
          type="text"
          label="Username"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}

        {/* Email Input */}
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
        <div>

        <Input
  type="email"
  label="Email"
  {...register("email", {
    required: "Email is required",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: "Invalid email address",
    },
  })}
/>

        </div>
          
        {otpSend && (
          <div className="flex gap-3">
            <Input ref={emailOtp}  placeholder="OTP" maxLength="6" divClass="w-24 h-9" />
            <button type="button"
              onClick={() => {
                varifyEmailOtp();
              }}
              className="px-4 py-1 rounded-md bg-blue-600 text-white font-medium "
            >
              Submit
            </button>
            {second !== 0 ? (
              <span className="px-2 py-1 font-medium mt-1">{second}</span>
            ) : (
              <button type="button"
                onClick={() => {
                  reSendOtp()
                }}
                className="px-4 py-1 rounded-md bg-green-600 text-white font-medium "
              >
                Resend
              </button>
            )}
          </div>
        )}

        {/* Password Input */}
        <Input
          type="password"
          label="Password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        {/* Confirm Password Input */}

        <Input
          type="tel"
          label="Phone Number"
          maxLength="10"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10}$/, // Only exactly 10 digits
              message: "Please enter a valid phone number (10 digits)",
            },
          })}
        />

{otpSend && (
          <div className="flex gap-3">
            <Input ref={phoneOtp}  placeholder="OTP" maxLength="6" divClass="w-24 h-9" />
            <button type="button"
              onClick={() => {
                verifyNumberOtp();
              }}
              className="px-4 py-1 rounded-md bg-blue-600 text-white font-medium "
            >
              Submit
            </button>
            {second !== 0 ? (
              <span className="px-2 py-1 font-medium mt-1">{second}</span>
            ) : (
              <button type="button"
                onClick={() => {
                  reSendOtp()
                }}
                className="px-4 py-1 rounded-md bg-green-600 text-white font-medium "
              >
                Resend
              </button>
            )}
          </div>
        )}
        {errors.number && (
          <p className="text-red-500 text-sm">{errors.number.message}</p>
        )}

        {/* Submit Button */}
        <Button type="submit" btn="Sign up" className="mt-5" />

        {/* Already have an account? */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?
            <Link to="/login">
              <span className="text-blue-500 hover:underline"> Log in</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
