import { useState } from "react";
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

        loginUser.admin
          ? navigate("/admin", { replace: true })
          : navigate("/employee", { replace: true });

        showSuccess("Login sucessfully");
      }
    } catch (error) {
      showError(error);
    } finally {
      setLoader(false);
    }
  };

  if (loader) {
    return <HomeSkeleton />;
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#111111]">
      <form
        className="w-96 p-5 flex flex-col gap-3  bg-[#1C1C1C] rounded-lg shadow-lg "
        onSubmit={handleSubmit(LoginDetails)}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <Input
          type="text"
          label="Username"
          {...register("email", { required: true })}
        />

        <Input
          type="password"
          label="Password"
          {...register("password", { required: true })}
        />

        <Button
          type="submit"
          className="mt-5  w-full h-9 bg-green-500  text-white font-medium rounded-md hover:bg-green-600"
          btn="Login"
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
  );
};

export default Login;
