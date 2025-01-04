import React, { memo, useEffect, useState , useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Input, Loader, VerifyOtp } from "../../export";
import authServices from "../../Appwrite/Auth";
import { useDispatch, useSelector } from "react-redux";
import emailjs, { send } from "emailjs-com";
import dataBaseServices from "../../Appwrite/Database";
import { login } from "../../Store/authSlice";
const Signup = () => {
  const [second, setSecond] = useState(60);
  const [otpSend, setOtpSend] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [userData , setUserData] = useState("")
  const [resend , setResend] = useState(false)
  const [loader , setLoader] = useState(false)
  const [userEmailVerify , setUserEmailVerify] = useState(false)
  const emailOtp = useRef(null);
  const firstRender = useRef(true)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Submit handler function
  const handleSignup = async (data) => {
    // if user is login they do dont able to create account
      setUserData(data);
      if (!userEmailVerify) {
        // if email not verify first verify for create a account
        setOtpSend(true)
        
      } else {
        try {
          setLoader(true);
          const newUser = await authServices.createAccount({...data , isEmailVerify : userEmailVerify});
          if(newUser){
            dispatch(login(newUser))
                    navigate("/");
                    setLoader(false);
                    toast.success("Account created succesfully");
          }
        } catch (error) {
           toast.error("account not created")
        } finally{
          setLoader(false)
        }
      }
    }

  useEffect(() => {
    
    if (firstRender.current) {
      return;
    }
        
    // send otp to the user email
    const sentOtp = () => {
      console.log("otp send succesfully", generatedOtp);
      const otpCode = Math.floor(Math.random() * 1000000);

      const templateParams = {
        to_email: userData.email, // The recipient's email
        to_name: userData.name, // The recipient's name
        from_name: "The Manager", // The sender's name
        message: `Your OTP code is: ${otpCode}`,
      };

      // emailjs.init("V6RgthY8oQceVRjcO");
      // emailjs
      //   .send(
      //     "service_lsyugp9",
      //     "template_jxaqwnp",
      //     templateParams,
      //     "V6RgthY8oQceVRjcO"
        // ) // Replace with your EmailJS credentials
        // .then(
        //   (response) => {
        //     if (response) {
              setGeneratedOtp(otpCode);
              console.log(otpCode);
              toast.success("OTP sent successfully!");
        //     }
        //   },
        //   (error) => {
        //     toast.error("Failed to send OTP. Please try again!");
        //   }
        // );
    };

    sentOtp();
  }, [otpSend , resend]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (second == 0) return;
    // change the timer
    const timer = setInterval(() => {
      setSecond((prev) => (prev > 0 ? prev - 1 : prev));
    }, 1000);

    return () => clearInterval(timer);
  }, [otpSend , resend]);


  const verifyEmailOtp = () => {
    if (parseInt(emailOtp.current.value) === parseInt(generatedOtp)) {
      toast.success("OTP Verified!");
      setUserEmailVerify(true);
    } else {
      toast.error("Invalid OTP, please try again.");
    }
  };

  const resendOtp = () => {
      setSecond(60);
      setResend(prev => !prev);
  }


  if (loader) {
    return <Loader />;
  }
  return (
    <div className=" h-screen flex justify-center items-center  bg-[#111111]">
      <form
        className=" px-5 py-2 flex flex-col  gap-3 rounded-lg shadow-lg w-96 bg-[#1C1C1C]"
        onSubmit={handleSubmit(handleSignup)}
      >
        <h2 className="text-2xl font-semibold text-center ">Sign Up</h2>

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
          {/*  user email */}
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

        {/* // verify otp componetns */}
        <VerifyOtp second={second} generatedOtp={generatedOtp} userEmailVerify={userEmailVerify} emailOtp={emailOtp} verifyEmailOtp = {verifyEmailOtp} resendOtp ={resendOtp}  />

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
          {...register("number", {
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10}$/, // Only exactly 10 digits
              message: "Please enter a valid phone number (10 digits)",
            },
          })}
        />

        {/* Submit Button */}
        <Button type="submit" btn="Sign up" className="mt-2 w-full h-10 bg-green-500 text-white font-bold text-base rounded-md hover:bg-green-600 " />

        {/* Already have an account? */}
        <div className="text-center text-xs">
          <p className=" text-gray-600">
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

export default memo(Signup);