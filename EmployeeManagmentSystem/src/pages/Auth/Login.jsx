import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import authServices from "../../Appwrite/Auth";
import Input from "../../components/Input";
import { Button, HomeSkeleton } from "../../export";
import { login } from "../../Store/authSlice";
import { fetchTask } from "../../Store/thunks/taskThunk";
import { showError, showSuccess } from "../../utlity/Error&Sucess";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LoginDetails = async (data) => {
    setLoader(true);

    try {
      const loginUser = await authServices.login(data);
      
      if (loginUser) {
        await dispatch(fetchTask(loginUser)).unwrap();
        dispatch(login(loginUser));

       navigate('/')

        showSuccess("Login sucessfully");
      }
    } catch (error) {
     showError(error.message)
    } finally {
      setLoader(false);
    }
  };

  if (loader) {
    return <HomeSkeleton />;
  }
  return (
    <>
     <div className="text-center absolute top-10 right-[40%]">
       <p>For admin login : - <span className="text-blue-700">bhavishya8824@gmail.com</span> </p>
     <p>password for both: - <span className="text-blue-700">12345678</span> </p>
    </div>
    <div className="flex justify-center items-center min-h-screen bg-[#111111]">
      <form
        className="w-96 p-5 flex flex-col gap-3 bg-[#bdbdbd]  rounded-lg shadow-lg text-black "
        onSubmit={handleSubmit(LoginDetails)}
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-black">Login</h2>
        <Input
          type="text"
          label="Username"
          {...register("email", { required: "email is required" })}
        />

        <Input
          type="password"
          label="Password"
          {...register("password", { required: "Password is required" ,
             minLength: {
                value: 8,
                message: "password must be 8 character long",
              }, }) }
        />

        <Button
        className="justify-center"
          label="Login"
        />

        <div className=" text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?
            <Link to="/signup">
              <span href="#" className="text-blue-500 hover:underline">
                {" "}
                Sign up
              </span>
            </Link>
          </p>
        </div>
      </form>
    </div>
    </>
  );
};

export default memo(Login)
