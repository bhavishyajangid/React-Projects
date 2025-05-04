import React, { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from "react-toastify";
import authServices from '../../Appwrite/Auth';
import Input from '../../components/Input';
import { Button, Loader, VerifyOtp } from '../../export';
import { login } from '../../Store/authSlice';
import { resetState, setGeneratedOtp, setLoader, setOtpSend, setResend, setUserEmailVerify } from '../../Store/otpSendSlice';
import { fetchTask } from '../../Store/TaskSlice';
const Login = () => {

   const { otpSend , generatedOtp , loader, resend , userEmailVerify} = useSelector(state => state.otpSendSlice)
    const { register, handleSubmit } = useForm();
    const [second, setSecond] = useState(60);
    const [userData , setUserData] = useState("")
    const emailOtp = useRef(null);
    const firstRender = useRef(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()


    const LoginDetails = async(data) => {
      setUserData(data)
      if(userEmailVerify){
         dispatch(setOtpSend(true))
      }else{
        try {
          dispatch(setLoader(true))
          const loginUser = await authServices.login(data)
          if(loginUser){
             navigate("/home")
            dispatch(login(loginUser))
            await dispatch(fetchTask(loginUser)).unwrap()
            toast.success("Login sucessfully");
          }
        } catch (error) {
          toast.error(`${error}`)
        }finally{
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
              console.log(otp);
              
              
              // Check if the OTP was successfully generated and sent
              if (otp) {
                console.log("Generated OTP:", otp);  // Logs the OTP value
                dispatch(setGeneratedOtp(otp));  // Set OTP in Redux store (dispatch the resolved OTP)
                toast.success("OTP sent successfully!");
              } else {
                toast.error("Failed to send OTP.");
              }
            } catch (error) {
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

      useEffect(() => {
        setSecond(60)
         dispatch(resetState())
      },[location , dispatch])

      const verifyEmailOtp = () => {
    
        const otpVerify = authServices.verifyOtp(emailOtp.current.value , generatedOtp)
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
     
    if(loader){
      return <Loader/>
    }
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#111111]">
      <form
        className="w-96 p-5 flex flex-col gap-3  bg-[#1C1C1C] rounded-lg shadow-lg "
        onSubmit={handleSubmit(LoginDetails)}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
          <Input 
          type='text' 
          label='Username' 
          {...register("email" , {required : true})}
          />
        
       
        <Input type='password' label='Password'
        
         {...register("password" , {required : true})} 
        />

       {
          !userEmailVerify && generatedOtp !== null && <VerifyOtp second={second} emailOtp={emailOtp} verifyEmailOtp = {verifyEmailOtp} resendOtp ={resendOtp}  />
        }



        <Button type="submit" className="mt-5  w-full h-9 bg-green-500  text-white font-medium rounded-md hover:bg-green-600" btn="Login" />

        <div className=" text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?
            <Link to="/signup">
            <span href="#" className="text-blue-500 hover:underline"> Sign up</span> 
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
