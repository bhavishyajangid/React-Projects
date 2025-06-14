import { useForm } from "react-hook-form";
import { HomeSkeleton, Input, Loader, SelectOption } from "../../export";
import {
  genderOptions,
  maritalStatusOptions,
  departmentOptions,
  roleOptions,
} from "../../utlity/SelectOption";
// import { handleCreatUser } from "../../Store/thunks/signupThunk";
import { useDispatch, useSelector } from "react-redux";
import authServices from "../../Appwrite/Auth";
import { useNavigate } from "react-router";
import { useState } from "react";
import { toast } from "react-toastify";
import { handleCreateAccount } from "../../Store/authSlice";

const AddEmployee = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {loader}  = useSelector(state => state.authSlice)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onSubmit = async(data) => {
   data.admin = data.admin == "true" ? true : false
    try {
       let employee =  await dispatch(handleCreateAccount(data)).unwrap()
      if(employee){
        console.log(employee , 'employee');
        
        navigate("/employee")
        toast.success('Employee Created Sucessfully')
      }
    } catch (error) {
      console.log(error , 'error ocur in the addEmployee');
      toast.error(error)
    }
  };

  console.log(loader , 'loader');
  
  if(loader){
    return <Loader/>
  }
  return (
    <div className="w-full mx-auto p-6 bg-white shadow rounded-lg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black"
      >
        <div>
          <Input
            label="Name"
            {...register("userName", { required: "Name is required" })}
            placeholder="Insert Name"
          />
          {errors.userName && (
            <p className="text-red-500 text-sm">{errors.userName.message}</p>
          )}
        </div>

        <div>
          <Input
            label="Email"
            type="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Insert Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Input
            label="Phone"
            type="tel"
            maxLength = "10"
           {...register("number", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/, // Only exactly 10 digits
                message: "Please enter a valid phone number (10 digits)",
              },
            })}
          />
          {errors.number && (
            <p className="text-red-500 text-sm">{errors.number.message}</p>
          )}
        </div>

        <div>
          <Input
            label="Date of Birth"
            type="date"
            {...register("dob", { required: "Date of birth is required" })}
          />
          {errors.dob && (
            <p className="text-red-500 text-sm">{errors.dob.message}</p>
          )}
        </div>

        <div>
          <SelectOption
            label="Gender"
            options={genderOptions}
            error={errors.gender?.message}
            {...register("gender", { required: "Gender is required" })}
          />
          
        </div>

        <div>
          <SelectOption
            label="Marital Status"
            options={maritalStatusOptions}
            error={errors.maritalStatus?.message}
            {...register("maritalStatus", {
              required: "Marital status is required",
            })}
          />
        </div>

        <div>
          <Input
            label="Designation"
            {...register("designation", { required: "Designation is required" })}
            placeholder="Designation"
          />
          {errors.designation && (
            <p className="text-red-500 text-sm">{errors.designation.message}</p>
          )}
        </div>

        <div>
          <SelectOption
            label="Department"
            options={departmentOptions}
            error={errors.department?.message}
            {...register("department", { required: "Department is required" })}
          />
        </div>

        <div>
          <Input
            label="Salary"
            type="number"
            {...register("salary", { required: "Salary is required" })}
            placeholder="Salary"
          />
          {errors.salary && (
            <p className="text-red-500 text-sm">{errors.salary.message}</p>
          )}
        </div>

        <div>
          <Input
            label="Password"
            type="password"
            {...register("password", { 
                required: "Password is required",
                 minLength: {
      value: 8,
      message: "Password must be at least 8 characters long",
    },

             })}
            placeholder="******"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div>
          <SelectOption
            label="Role"
            options={roleOptions}
             error={errors.admin?.message}
            {...register("admin", { required: "Role is required" })}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Upload Image</label>
          <input
            type="file"
            {...register("profileUrl", { required: "Profile image is required" })}
            className="w-full text-sm"
          />
          {errors.profile && (
            <p className="text-red-500 text-sm">{errors.profile.message}</p>
          )}
        </div>

        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition font-medium"
          >
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
