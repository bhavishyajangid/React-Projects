import React, {
  memo,
  useCallback,
  useId,
  useReducer,
  useRef,
  useState,
} from "react";
import authService from "../../appwrite/auth";
import { Button, Input } from "../../export";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../../Store/authSlice";
import { useDispatch } from "react-redux";
import VerifyOtp from "../../components/VerifyOtp";
import { toast } from "react-toastify";
import useOtp from "../../hooks/useOtp";
const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useRef(null);
  const abortRef = useRef(null);
  const [loader, setLoader] = useState(false);
  const {
    sendOtp,
    otpVerified,
    showOtpField,
    generatedOtp,
    validateOtp,
    resendOtp,
    formattedTime,
    formLocked,
    otpLoading
  } = useOtp(userData.current);
  // using react-form library for handle form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // making signup funcationalty
  const Signup = async (data) => {
    userData.current = data;
    setLoader(true);
    try {
      if (!otpVerified) {
        await sendOtp(data);
        return;
      }
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Signup failed");
    } finally {
      setLoader(false);
    }
  };

  let options = [
    {
      id: "name",
      label: "name",
      show: true,
      placeholder: "Enter your name",
      type: "text",
      registerOptions: {
        required: "Name is required",
      },
    },
    {
      id: "email",
      label: "email",
      show: true,
      placeholder: "Enter your email",
      type: "email",
      registerOptions: {
        required: "Email is required",
        validate: {
          matchPatern: (value) =>
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
            "Email address must be a valid address",
        },
      },
    },
    {
      id: "password",
      label: "password",
      show: true,
      placeholder: "Enter your password",
      type: "password",
      registerOptions: {
        required: "Password is required",
        validate: {
          minLength: (value) =>
            value.length >= 6 || "Password must be at least 6 characters",
        },
      },
    },
  ];

  return (
    <div className="w-4/5 h-[70vh] max-lg:w-11/12 m-auto flex items-center justify-center">
      <div className=" flex flex-col items-center gap-5 p-5 ">
        <h1 className="text-3xl text-[#414753] prata-regular">
          Sign Up{" "}
          <span className="inline-block w-9 max-sm:h-[1.5px] h-[2px] bg-gray-900"></span>
        </h1>

        <form
          onSubmit={handleSubmit(Signup)}
          className=" flex flex-col gap-5 items-center"
        >
          {options?.map(
            (option) =>
              option.show && (
                <div
                  key={option.id}
                  className="w-full flex flex-col gap-2 items-start"
                >
                  <Input
                    disabled={formLocked}
                    id={option.id}
                    label={option.label}
                    error={errors[option.label] && errors[option.label].message}
                    className="w-96 h-10 border border-black border-solid outline-none px-2 placeholder:text-sm"
                    placeholder={option.placeholder}
                    type={option.type}
                    {...register(option.label, option.registerOptions)}
                  />
                </div>
              ),
          )}

          {showOtpField && !otpVerified && (
            <VerifyOtp
              validateOtp={validateOtp}
              resendOtp={resendOtp}
              formattedTime={formattedTime}
              generatedOtp={generatedOtp}
              setLoader={setLoader}
            />
          )}

          <div className="w-full flex items-center justify-between ">
            <Link to="/login">
              <button className="text-xs">Login account</button>
            </Link>
          </div>

          <Button
            disabled={formLocked | loader | otpLoading}
            className={`${formLocked | loader | otpLoading ? "bg-gray-500" : "bg-black"} w-96 h-10 rounded-md  text-white`}
            type="submit"
          >
            {loader || otpLoading ? <span className="loader"></span> : <span>Sign Up </span>}
          </Button>
          {/* <Button
            disabled={formLocked | loader | otpLoading}
            className={`${formLocked | loader | otpLoading ? "bg-gray-500" : "bg-black"} w-96 h-10 rounded-md  text-white`}
            type="button"
            onClick={() => {authService.signupWithGoogle()}}
          >
            {loader || otpLoading ? <span className="loader"></span> : <span>Google </span>}
          </Button> */}
        </form>
      </div>
    </div>
  );
};

export default memo(Signup);
