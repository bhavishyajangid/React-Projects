import { memo, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authServices from "../../Appwrite/Auth";
import dataBaseServices from "../../Appwrite/Database";
import { Button, Input, Loader, VerifyOtp } from "../../export";
import { login } from "../../Store/authSlice";
import {
  setGeneratedOtp,
  setLoader,
  setOtpSend,
} from "../../Store/otpSendSlice";
import { resetState } from "../../Store/otpSendSlice";

const Signup = () => {
  console.log("signup");

  const {
    otpSend,
    generatedOtp,
    resend,
    loader,
    userEmailVerify,
    formDetails,
  } = useSelector((state) => state.otpSendSlice);
  const firstRender = useRef(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()
  // Submit handler function

  const handleSignup = async (data) => {
    const verifyEmailExist = await dataBaseServices.emailIsExists(data.email);
    if (verifyEmailExist) {
      return toast.error("Email Already In Use !! Try Another Email");
    }
    if (!userEmailVerify) {
      // if email not verify first verify for create a account
      dispatch(setOtpSend({ otp: true, user: data }));
    } else {
      try {
        dispatch(setLoader(true));
        const newUser = await authServices.createAccount({
          ...data,
          isEmailVerify: userEmailVerify,
        });
        console.log(newUser, "new user foud");

        if (newUser) {
          dispatch(login(newUser));
          newUser.admim ? navigate("/admin") : navigate("/employee");
          toast.success("Account created succesfully");
        }
      } catch (error) {
        toast.error(`${error}`);
      } finally {
        dispatch(setLoader(false));
      }
    }
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    // Asynchronous function to send OTP
    const handleSendOtp = async () => {
      if (otpSend) {
        dispatch(setLoader(true));
        try {
          const otp = await authServices.sendOtp(formDetails); // Wait for OTP to be sent

          if (otp) {
            console.log("Generated OTP:", otp);
            dispatch(setGeneratedOtp(otp));
            toast.success("OTP sent successfully to email !");
          }
        } catch (error) {
          console.error("Error sending OTP:", error);
          toast.error("Failed to sending OTP.");
        } finally {
          dispatch(setLoader(false));
        }
      }
    };

    handleSendOtp(); // Invoke the OTP sending function
  }, [otpSend, resend]); // Run the effect when otpSend or resend changes


  useEffect(() => {
          dispatch(resetState())
  }, [location.pathname])

  
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
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
          <Input
            type="text"
            label="Username"
            {...register("userName", { required: "Username is required" })}
          />

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
          {!userEmailVerify && generatedOtp !== null && (
            <VerifyOtp generatedOtp={generatedOtp} />
          )}

          {/* Password Input */}
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
          <Input
            type="password"
            label="Password"
            autoComplete="current-password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "password must be 8 character long",
              },
            })}
          />

          {/* Confirm Password Input */}

          {errors.number && (
            <p className="text-red-500 text-sm">{errors.number.message}</p>
          )}
          <Input
            type="tel"
            label="Phone number"
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
          <Button
            type="submit"
            btn="Sign up"
            className="mt-2 w-full h-10 bg-green-500 text-white font-bold text-base rounded-md hover:bg-green-600 "
          />

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
