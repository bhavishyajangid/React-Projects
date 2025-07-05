import { useForm } from "react-hook-form";
import { Input, Loader, SelectOption } from "../../export";
import {
  departmentOptions,
  genderOptions,
  maritalStatusOptions,
  roleOptions,
} from "../../utlity/SelectOption";
// import { handleCreatUser } from "../../Store/thunks/signupThunk";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import dataBaseServices from "../../Appwrite/Database";
import { editUser } from "../../Store/thunks/userThunk";

const AddOrEditEmployee = ({ employee }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: employee?.userName || "",
      email: employee?.email || "",
      number: employee?.number || "",
      dob: employee?.dob || "",
      gender: employee?.gender || "",
      maritalStatus: employee?.maritalStatus || "",
      department: employee?.department || "",
      salary: employee?.salary || "",
      admin: employee ? (employee.admin ? "Admin" : "Employee") : "",

    },
  });

  const { loader, currentUserDetails } = useSelector(state => state.authSlice)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let selfDetailEdit = currentUserDetails.userName == employee?.userName ? true : false


  const onSubmit = async (data) => {
    data.admin = data.admin === "true" || data.admin === true;
    delete data.password

    
if (!data.profileUrl || data.profileUrl.length === 0 || data.profileUrl[0]?.size === 0) {
  data.profileUrl = employee.profileUrl;
}

    if (employee) {
      try {
        const user = await dispatch(editUser({ userId: employee.$id, data })).unwrap()
        if (user) {
          toast.success("Employee Updated Sucessfully")
          navigate("/user")
        }
      } catch (error) {
        console.log(error);

        toast.error(error.message || 'something went wrong while update the user')
      }
    }








    // clearErrors()
    //   data.admin = data.admin == "true" ? true : false
    //     try {
    //        let employee =  await dispatch(handleCreateAccount({data , currentUser : currentUserDetails || null})).unwrap()
    //       if(employee){
    //         console.log(employee , 'employee');
    //         navigate("/user")
    //          reset();
    //         toast.success('Employee Created Sucessfully')
    //       }
    //     } catch (error) {
    //         if (error?.field && error?.message) {
    //   setError(error.field, {
    //     type: "manual",
    //     message: error.message,
    //   });
    // } else {
    //   toast.error(error?.message || "Something went wrong");
    // }
    //     }





  };

  console.log(loader, 'loader');

  if (loader) {
    return <Loader />
  }
  return (
    <div className="w-full mx-auto p-6 bg-white shadow rounded-lg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black"
      >
        <div >
          <Input
            label="Name"
            readOnly={!selfDetailEdit}
            className={`${!selfDetailEdit && "bg-gray-200"}`}
            {...register("userName", {
              ...(!selfDetailEdit ? {} : { required: "Name is required" }),
            })}
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
            readOnly={!selfDetailEdit}
            className={`${!selfDetailEdit && "bg-gray-200"}`}
            {...register("email", {
              ...(!selfDetailEdit ? {} : { required: "Email is required" }),
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Input
            label="Phone"
            type="tel"
            maxLength="10"
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

        {/* <div>
          <Input
            label="Password"
            type="password"
            readOnly={!selfDetailEdit}
            className={`${!selfDetailEdit && "bg-gray-200"}`}
             {...register("password", {
    ...(!selfDetailEdit
      ? {}
      : {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters long",
          },
        }),
  })}
            placeholder="******"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div> */}

        {/* <div>
          <Input
            label="Admin Password for Security"
            type="password"
            {...register("adminPassword", { 
                required: "Admin Password is required",
                 minLength: {
      value: 8,
      message: "Password must be at least 8 characters long",
    },

             })}
            placeholder="******"
          />
          {errors.adminPassword && (
            <p className="text-red-500 text-sm">{errors.adminPassword.message}</p>
          )}
        </div> */}

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
            {...register("profileUrl")}
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
            {employee ? "Update" : 'Add Employee'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrEditEmployee;
