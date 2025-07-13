import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import dataBaseServices from "../../../Appwrite/Database";
import { Button, Input, Loader } from "../../../export";
import { DefaultContext } from "react-icons/lib";
import { handleAddLeave } from "../../../Store/thunks/leaveThunk";
import { Navigate, useNavigate } from "react-router";

const departments = ["Tech", "HR", "Marketing", "Database"];
const leaveTypes = ["Sick Leave", "Casual Leave", "Paid Leave", "Maternity Leave", "Emergency Leave"];
const leaveStatus = ["Pending", "Approved", "Rejected"];

const AddLeave = () => {
  const {currentUserDetails} = useSelector(state => state.authSlice)
  const {loader} = useSelector(state => state.leaveSlice)
  const { register, handleSubmit, reset, watch } = useForm({defaultValues : {
    employeeId : currentUserDetails.userId
  }});
  const watchFromDate = watch("fromDate");
  const watchToDate = watch("toDate");
  const dispatch = useDispatch()
  const navigate = useNavigate()

 

  const calculateDays = () => {
    if (watchFromDate && watchToDate) {
      const start = new Date(watchFromDate);
      const end = new Date(watchToDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return String(diffDays)
    }
    return 0;
  };

  const onSubmit = async (data) => {
    let completeData = {
      ...data,
      totalDays : calculateDays(),
      appliedDate : new Date().toISOString().split("T")[0],
      status : 'pending',
      attachementUrl : data.attachementUrl[0]
    }
    console.log(completeData);
    try {
      const result = await dispatch(handleAddLeave(completeData)).unwrap()
      if (result) {

        toast.success("Leave successfully added!");
        navigate(`/leavehistory/${currentUserDetails.userId}`)
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to add leave");
    } finally {
      reset();
    }
  };

  if (loader) return <Loader />;

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full p-6">
        <h2 className="text-2xl font-semibold mb-6">Add Leave Request</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Employee Id"
            type="text"
            readOnly
            className = "text-gray-500 font-semibold"
            {...register("employeeId", { required: "To date is required" })}
          />
          {/* Department */}
          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <select
              {...register("department", {
                required: "Department is required",
              
              })}
              className="w-full px-3 py-2 border rounded-md text-sm"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          
        
          {/* Leave Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Leave Type</label>
            <select
              {...register("leaveType", { required: "Leave type is required" })}
              className="w-full px-3 py-2 border rounded-md text-sm"
            >
              <option value="">Select Leave Type</option>
              {leaveTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* From Date */}
          <Input
            label="From"
            type="date"
            {...register("fromDate", { required: "From date is required" })}
          />

          {/* To Date */}
          <Input
            label="To"
            type="date"
            {...register("toDate", { required: "To date is required" })}
          />

          {/* Description */}
          <Input
            label="Description"
            placeholder="Reason for leave"
            type="text"
            {...register("description", { required: "Description is required" })}
          />

        

          {/* Total Days (auto) */}
          <Input
            label="Total Days"
            type="number"
            value={calculateDays()}
            disabled
          />

          {/* Optional Attachment */}
          <Input
            label="Attachment (Optional)"
            type="file"
            {...register("attachementUrl")}
          />
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <Button
            className="w-full flex justify-center"
            label={loader ? "Processing..." : "Submit Leave"}
          />
        </div>
      </form>
    </div>
  );
};

export default AddLeave;
