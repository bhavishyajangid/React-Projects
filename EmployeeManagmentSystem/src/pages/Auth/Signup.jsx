import { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authServices from "../../Appwrite/Auth";
import { Button, Input, Loader, VerifyOtp } from "../../export";

import {
  handleEmailExist,
  handleOtp,
  resetState,
  setLoader,
  setOtpSend
} from "../../Store/otpSendSlice";

const Signup = () => {
  const {
    otpSend,
    generatedOtp,
    loader,
    userEmailVerify,
    formDetails,
  } = useSelector((state) => state.otpSendSlice);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (data) => {

    if (!userEmailVerify) {
      const lastEmail = formDetails?.email;

      // 2. Only proceed if the email is different from the last OTP attempt
      if (lastEmail !== data.email) {
        const emailExists = await dispatch(
          handleEmailExist(data.email)
        ).unwrap();

        if (emailExists) {
          toast.error("Email already in use! Try another email.");
        } else {
          // if the email is not already in use then send otp 
          dispatch(setOtpSend({ otp: true, user: data }));
        }
      }
      return;
    } else {
      try {
        dispatch(setLoader(true));
        const newUser = await authServices.createAccount({
          ...data,
          isEmailVerify: userEmailVerify,
        });

        if (newUser) {
          navigate("/login");
          toast.success("Account created succesfully");
        }
      } catch (error) {
        console.log(error);
        toast.error(`${error}ughiuyiy`);
      } finally {
        dispatch(setLoader(false));
      }
    }
  };

  useEffect(() => {
    // Asynchronous function to send OTP
    const handleSendOtp = async () => {

      if (otpSend) {
        try {
          const otp = await dispatch(handleOtp(formDetails)).unwrap(); // Wait for OTP to be sent

          if (otp) {
            console.log("Generated OTP:", otp);
            toast.success("OTP successfully sent to email !");
          }
        } catch (error) {
          console.error("Error sending OTP:", error);
          toast.error("Failed to sending OTP.");
        }
      }
    };

    handleSendOtp(); // Invoke the OTP sending function
  }, [otpSend]); // Run the effect when otpSend or resend changes

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [dispatch]);

  if (loader) {
    return <Loader />;
  }
  return (
    <>
      <div className=" h-screen flex justify-center items-center  bg-[#111111]">
        <form
          className=" px-5 py-2 flex flex-col  gap-3 rounded-lg shadow-lg w-96 bg-[#bdbdbd] text-black"
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
          <Button type="submit" label="Sign Up" className="justify-center" />

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
