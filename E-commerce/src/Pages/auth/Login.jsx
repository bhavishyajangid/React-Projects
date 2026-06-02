import React from "react";
import { useState } from "react";
import authService from "../../appwrite/auth";
import { Button, Input } from "../../export";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login as authLogin } from "../../Store/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import dataBaseServices from "../../appwrite/Database";
const Login = ({ admin = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  // use react-form-library for handle form
  const { register, handleSubmit, errors } = useForm();
  // making login funcationalty)
  const Login = async (data) => {
    setLoader(true);
    const controller = new AbortController();
    try {
      const userExists = await dataBaseServices.emailIsExists(data.email);

      if (!userExists) {
        toast.error("Email does not exist. Please check email and try again.");
        return;
      }
      console.log(userExists, "userExists from login function");
      if (admin && !userExists.isAdmin) {
        toast.error("User is not an admin");
        return;
      }

      const userData = await authService.login(data);

      if (userData) {
        dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Login failed");
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className="w-4/5 h-[70vh] max-lg:w-11/12 m-auto flex items-center justify-center">
      <div className=" flex flex-col items-center gap-5 p-5 ">
        <h1 className="text-3xl text-[#414753] prata-regular">
          {admin ? "Admin Log In" : " Log In"}
          <span className="inline-block w-9 max-sm:h-[1.5px] h-[2px] bg-gray-900"></span>
        </h1>
        <form
          onSubmit={handleSubmit(Login)}
          className=" flex flex-col gap-5 items-center"
        >
          <Input
            className="w-96 h-10 border border-black border-solid outline-none px-2"
            placeholder="Email"
            error={errors?.email?.message}
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              },
            })}
          />

          <Input
            className="w-96 h-10 border border-black border-solid outline-none px-2"
            placeholder="Password"
            {...register("password", {
              required: true,
            })}
          />

          <div className="w-full flex items-center justify-between ">
            <button className="text-xs  ">Forgot Password</button>
            <Link to="/signup">
              <button className="text-xs">Create account</button>
            </Link>
          </div>
          <Button
            disabled={loader}
            className="w-96 h-10 rounded-md bg-black text-white"
            type="submit"
          >
            {loader ? <span className="loader"></span> : <span>Log In </span>}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
