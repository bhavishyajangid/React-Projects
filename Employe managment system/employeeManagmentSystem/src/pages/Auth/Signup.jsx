import React from 'react';
import { useForm } from "react-hook-form";
 // Assuming you're using a custom Input component
import { Link } from 'react-router';
import { Button , Input } from '../../export';

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Submit handler function
  const handleSignup = (data) => {
    console.log("Signup Data: ", data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#111111]">
      <form
        className="p-5 flex flex-col gap-3 rounded-lg shadow-lg w-96 bg-[#1C1C1C]"
        onSubmit={handleSubmit(handleSignup)}
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

        {/* Username Input */}
        <Input
          type="text"
          label="Username"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}

        {/* Email Input */}
        <Input
          type="email"
          label="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address"
            }
          })}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        {/* Password Input */}
        <Input
          type="password"
          label="Password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        {/* Confirm Password Input */}
        <Input
          type="password"
          label="Confirm Password"
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            validate: value =>
              value === watch("password") || "Passwords don't match"
          })}
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}

        {/* Submit Button */}
        <Button type="submit" btn="Sign up" className="mt-5"/>

        {/* Already have an account? */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?
            <Link to="/login">
            <span href="#" className="text-blue-500 hover:underline"> Log in</span> 
            </Link>
            
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
