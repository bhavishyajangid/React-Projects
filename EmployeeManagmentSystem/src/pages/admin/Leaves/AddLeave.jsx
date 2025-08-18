import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Button, Input, Loader } from "../../../export";
import { handleAddLeave } from "../../../Store/leaveSlice";
import { formatDate } from "../../../utlity/formateDate";
const departments = ["Tech", "HR", "Marketing", "Database"];
const leaveTypes = [
  "Sick Leave",
  "Casual Leave",
  "Paid Leave",
  "Maternity Leave",
  "Emergency Leave",
];
const leaveDay = ["Full Day", "Half Day"];

const AddLeave = () => {
  const { attendenceMarkedIn, attendenceMarkedOut } = useSelector(
    (state) => state.attendenceSlice
  );
  const { currentUserDetails } = useSelector((state) => state.authSlice);
  const { loader } = useSelector((state) => state.leaveSlice);
  const { register, handleSubmit, reset, watch, control } = useForm({
    defaultValues: {
      employeeId: currentUserDetails.userId,
      department: currentUserDetails.department || "",
    },
  });
  const watchFromDate = watch("fromDate");
  const watchToDate = watch("toDate");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const calculateDays = () => {
    if (watchFromDate && watchToDate) {
      const diffTime = Math.abs(watchToDate - watchFromDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      return String(diffDays);
    }
    return 0;
  };

  const onSubmit = async (data) => {
    data.fromDate = formatDate(data.fromDate);
    data.toDate = formatDate(data.toDate);
    let todayDate = formatDate(new Date().toISOString().slice(0, 10));
    data.emergency = data.emergency === "true" ? true : false;


    if (
      todayDate == data.fromDate &&
      attendenceMarkedIn &&
      attendenceMarkedOut
    ) {
      toast.error("Today Attendence Is Marked Cannot Apply Today  Leave");
      return;
    }

    if (
      todayDate == data.fromDate &&
      attendenceMarkedIn &&
      data.leaveDay == "Full Day"
    ) {
      toast.error(
        "You Marked Today Attendence So You Cannot Take Full Day Leave"
      );
      return;
    }

    let completeData = {
      ...data,
      totalDays: calculateDays(),
      appliedDate: todayDate,
      status: "pending",
      attachmentUrl: data.attachmentUrl.length > 0 ? data.attachmentUrl : "",
      employeeName: currentUserDetails.userName,
    };
    console.log(completeData);
    try {
      const result = await dispatch(handleAddLeave(completeData)).unwrap();
      if (result) {
        navigate(`/leavehistory/${currentUserDetails.userId}`);
        setTimeout(() => {
          toast.success("Leave successfully added!", { autoClose: 1000 });
        }, 100); //
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  if (loader) return <Loader />;

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full p-6 max-sm:p-0">
        <h2 className="text-2xl font-semibold mb-6">Add Leave Request</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Employee Id"
            type="text"
            readOnly
            className="text-gray-500 font-semibold"
            {...register("employeeId", { required: "To date is required" })}
          />
          {/* Department */}
          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <select
              disabled
              {...register("department", {
                required: "Department is required",
              })}
              className="w-full px-3 py-2 border rounded-md text-sm"
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
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
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Leave Day</label>
            <select
              {...register("leaveDay", { required: "Leave Day is required" })}
              className="w-full px-3 py-2 border rounded-md text-sm"
            >
              <option value="">Select Leave Day</option>
              {leaveDay.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          {/* From Date */}
          <div>
            <label className="block text-sm font-medium mb-1">From</label>
            <Controller
              name="fromDate"
              control={control}
              rules={{
                required: "From date is required",
                validate: (value) => {
                  if (!value) return "From date is required";

                  const today = new Date();
                  // remove time part to compare only yyyy-mm-dd
                  today.setHours(0, 0, 0, 0);

                  const selectedDate = new Date(value);
                  selectedDate.setHours(0, 0, 0, 0);

                  return (
                    selectedDate >= today ||
                    "You cannot apply leave before today"
                  );
                },
              }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  wrapperClassName="w-full"
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select start date"
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  minDate={new Date()} // <- also disables past dates in picker UI
                />
              )}
            />
          </div>

          <div>
            {/* To Date */}
            <label className="block text-sm font-medium mb-1">To</label>
            <Controller
              name="toDate"
              control={control}
              rules={{
                required: "From date is required",
                validate: (value) => {
                  if (!value) return "From date is required";

                  const today = new Date();
                  // remove time part to compare only yyyy-mm-dd
                  today.setHours(0, 0, 0, 0);

                  const selectedDate = new Date(value);
                  selectedDate.setHours(0, 0, 0, 0);

                  return (
                    selectedDate >= today ||
                    "You cannot apply leave before today"
                  );
                },
              }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  wrapperClassName="w-full"
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select start date"
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  minDate={new Date()} // <- also disables past dates in picker UI
                />
              )}
            />
          </div>
          {/* Description */}
          <Input
            label="Description"
            placeholder="Reason for leave"
            type="text"
            {...register("description", {
              required: "Description is required",
            })}
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
            {...register("attachmentUrl")}
          />

          <div>
            <label className="block text-sm font-medium mb-1">
              Emergency(optional){" "}
            </label>
            <select
              {...register("emergency")}
              className="w-full px-3 py-2 border rounded-md text-sm"
            >
              <option defaultValue={false} value="">
                Select Option
              </option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
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
