import React, { memo, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authServices from "../../Appwrite/Auth";
import { Button, Input, Loader, VerifyOtp } from "../../export";
import { resetState, setGeneratedOtp, setLoader, setOtpSend, setResend, setUserEmailVerify } from "../../Store/otpSendSlice";
import dataBaseServices from "../../Appwrite/Database";
import { login } from "../../Store/authSlice";

const Signup = () => {
console.log('signup');

  const { otpSend , generatedOtp ,resend , loader ,   userEmailVerify} = useSelector(state => state.otpSendSlice)
  const [second, setSecond] = useState(60);
  const [userData , setUserData] = useState("")
  const emailOtp = useRef(null);
  const firstRender = useRef(true);

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

    try {
        
                const verifyEmailExist = await dataBaseServices.emailIsExists(data.email) 
        
                console.log(verifyEmailExist);
                
                if(verifyEmailExist){
                    return toast.error("Email Already In Use !! Try Another Email")
                }
               } catch (error) {
                   console.log(error , "SomeThing Went Wrong");  
               }

      if (!userEmailVerify) { 
        // if email not verify first verify for create a account
        dispatch(setOtpSend(true))
      } else {
        try {
          dispatch(setLoader(true))
          console.log("user under process");
          
          const newUser = await authServices.createAccount({...data , isEmailVerify : userEmailVerify});
          console.log(newUser , "new user foud");
          
          if(newUser){
            dispatch(login(newUser))
                    newUser.admim ? navigate("/admin") : navigate("/employee")
                    toast.success("Account created succesfully");
          }

          
        } catch (error) {
           toast.error(`${error}`)
        } finally{
          dispatch(setLoader(false))
        }
      }
    }

    useEffect(() => {
      if (firstRender.current) {
        return;
      }
    
      // Asynchronous function to send OTP
      const handleSendOtp = async () => {
        if (otpSend) {
          try {
            dispatch(setLoader(true))
            const otp = await authServices.sendOtp(userData);  // Wait for OTP to be sent
            
            // Check if the OTP was successfully generated and sent
            if (otp) {
              console.log("Generated OTP:", otp);  // Logs the OTP value
              dispatch(setGeneratedOtp(otp));  // Set OTP in Redux store (dispatch the resolved OTP)
              toast.success("OTP sent successfully to email !");
            } else {
              toast.error("Failed to send OTP.");
            }
          } catch (error) {
            console.error("Error sending OTP:", error);
            toast.error("Error sending OTP.");
          }finally{
            dispatch(setLoader(false))
         }
        }
      };
    
      handleSendOtp();  // Invoke the OTP sending function
    
    }, [otpSend, resend]);  // Run the effect when otpSend or resend changes
    

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

  // if the user change the route or naviagate to another page the state will reset 
   useEffect(() => {
          dispatch(resetState())
          setSecond(60)
    },[location , dispatch])


  const verifyEmailOtp = async() => {
    const otpVerify = await authServices.verifyOtp(emailOtp.current.value , generatedOtp)
    if(otpVerify){
      dispatch(setUserEmailVerify(true))
      toast.success("OTP Verified!");
    }else{
      toast.error("Invalid OTP, please try again.");
    }
    
  };

  const resendOtp = () => {
      setSecond(60);
      dispatch(setResend(!resend))
  }


  if (loader) {
    return <Loader />;
  }
  return (
    
      <>
      
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
        {
          !userEmailVerify && generatedOtp !== null && <VerifyOtp second={second} emailOtp={emailOtp} verifyEmailOtp = {verifyEmailOtp} resendOtp ={resendOtp}  />
        }
        

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
    </>
  );
};

export default memo(Signup);