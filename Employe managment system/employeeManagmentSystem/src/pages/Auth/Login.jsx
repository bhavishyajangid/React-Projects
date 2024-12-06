import React, { useState } from 'react';
import Input from '../../components/Input';
import { useForm } from "react-hook-form";
import { Link } from 'react-router';
import { Button } from '../../export';
const Login = () => {
    const { register, handleSubmit } = useForm();

    const LoginDetails = (data) => {
        console.log('submit');
        
          console.log(data);
          
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
          {...register("Username" , {required : true})}
          />
        
       
        <Input type='password' label='Password'
        
         {...register("Password" , {required : true})} 
        />
        <Button type="submit" className="mt-5" btn="Login" />

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
