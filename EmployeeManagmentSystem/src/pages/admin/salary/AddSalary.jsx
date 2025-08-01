import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SalaryServices from "../../../Appwrite/Salary";
import { Button, Input, Loader, SkeletonSalaryHistory } from "../../../export";
import { Navigate, useNavigate } from "react-router";

const departments = ["Tech", "HR", "Marketing", "Database"];

const AddSalary = () => {
  const { allEmployee } = useSelector((state) => state.authSlice);
  const { register, handleSubmit, watch, reset } = useForm();
  const [loader, setLoader] = useState(false);
  const [department, setDepartment] = useState("");
  const navigate = useNavigate()
  let employee = department.trim() ? allEmployee.filter((item) => item.department == department) : allEmployee

  const onSubmit = async (data) => {
    setLoader(true);
    try {
      const result = await SalaryServices.addSalary(data);
      if (result){
        navigate(`/salaryhistory/${data.employeeId}`)
toast.success(`Salary Added To Employee`);
      } 
    } catch (error) {
        console.log(error);
        
      toast.error(error.message || "failed to add salary ");
    } finally {
      setLoader(false);
      reset();
    }
  };

  if (loader) return <SkeletonSalaryHistory />;

  return (
    <div className=" flex justify-center items-center bg-gray-100 ">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full   p-6 ">
        <h2 className="text-2xl font-semibold mb-6">Add New Salary</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Department Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <select
              {...register("department", {
                required: "Department is required",
                 onChange: (e) => setDepartment(e.target.value),
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-sm"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          {/* Employee Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">Employee</label>
            <select
              {...register("employeeId", { required: "Employee is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-sm"
            >
              <option value="">Select Employee</option>
              {employee.map((emp) => (
                <option key={emp.$id} value={emp.userId}>
                  {emp.userName}
                </option>
              ))}
            </select>
          </div>

          {/* Basic Salary */}
          <Input
            label="Basic Salary"
            placeholder="Enter Salary"
            type="number"
            {...register("salary", { required: "Salary is required" })}
          />

          {/* Pay Date */}
          <Input
            label="Pay Date"
            type="date"
            {...register("payDate", { required: "Pay Date is required" })}
          />

          {/* Deductions */}
          <Input
            label="Deductions"
            placeholder="Monthly Deductions"
            type="number"
            {...register("deductions", { required: "Deductions are required" })}
          />
          <Input
            label="Allowance"
            placeholder="Monthly Allowance"
            type="number"
            {...register("allowance", { required: "Deductions are required" })}
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6 ">
          <Button
            className="w-full flex justify-center"
            label={loader ? "Processing..." : "Add Salary"}
          />
        </div>
      </form>
    </div>
  );
};

export default AddSalary;
