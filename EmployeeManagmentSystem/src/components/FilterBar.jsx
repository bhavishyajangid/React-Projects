import { memo } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from 'react-hook-form';
import Button from './Button'; // You can replace this with a native <button> if needed

const FilterBar = ({ filterTask, resetTask, dropDownOption, dropDownName }) => {
  const { register, handleSubmit, reset, control } = useForm();

  const taskReset = () => {
    reset();
    resetTask();
  };

  return (
    <form
      onSubmit={handleSubmit(filterTask)}
      className="w-full p-4 rounded-xl shadow-lg mb-10 bg-white"
    >
      <div className="flex flex-col gap-6 md:flex-row md:flex-wrap md:items-end">

        {/* Start Date */}
        <div className="w-full md:w-[calc(22%-0.75rem)] ">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            From
          </label>
          <Controller
            control={control}
            name="startDate"
            render={({ field }) => (
              <DatePicker
                {...field}
                wrapperClassName="w-full"
                dateFormat="dd/MM/yyyy"
                placeholderText="Select start date"
                className="w-full border px-3 py-2 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                selected={field.value}
                onChange={(date) => field.onChange(date)}
              />
            )}
          />
        </div>

        {/* End Date */}
        <div className="w-full md:w-[calc(22%-0.75rem)]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To
          </label>
          <Controller
            control={control}
            name="endDate"
            render={({ field }) => (
              <DatePicker
                {...field}
                wrapperClassName="w-full"
                dateFormat="dd/MM/yyyy"
                placeholderText="Select end date"
                className="w-full border px-3 py-2 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                selected={field.value}
                onChange={(date) => field.onChange(date)}
              />
            )}
          />
        </div>

        {/* Dropdown */}
        {dropDownName && (
          <div className="w-full md:w-[calc(25%-0.75rem)]">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {dropDownName}
            </label>
            <select
              {...register(dropDownName === 'Status' ? 'status' : 'employeeId')}
              className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              <option value="">{dropDownName}</option>
              {dropDownOption.map((item, index) => (
                <option
                  key={item.$id || index}
                  value={item.userId || item.userName}
                  className="capitalize"
                >
                  {item.userName}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Buttons */}
        <div className="w-full md:w-[calc(25%-0.75rem)] flex gap-2 md:justify-end">
          <button
            type="submit"
            className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded-md shadow transition-all duration-200"
          >
            Apply
          </button>
          <button
            type="button"
            onClick={taskReset}
            className="w-full md:w-auto bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-5 py-2 rounded-md shadow transition-all duration-200"
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  );
};

export default memo(FilterBar);
