import { useForm } from 'react-hook-form';
import Input from './Input';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { memo } from 'react';

const FilterBar = ({filterTask , resetTask}) => {
  const dispatch = useDispatch()
  const {allEmployee} = useSelector(state => state.authSlice)
  const { register, handleSubmit, reset } = useForm();

  
   const taskReset = () => {
     reset()
     resetTask()
   }

  return (
    <form
      onSubmit={handleSubmit(filterTask)}
      className="w-full p-6 rounded-xl shadow-lg bg-white space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-end gap-6">
        {/* Employee Dropdown */}
        <div className="w-full md:w-1/4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Employee
          </label>
          <select
            className="w-full bg-white border border-gray-300 text-sm px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            {...register('employeeId')}
          >
            <option value="">All Employees</option>
            {allEmployee.map((item) => (
              <option key={item.$id} value={item.userId} >
                {item.userName}
              </option>
            ))}
          </select>
        </div>

        {/* Start Date */}
        <div className="w-full md:w-1/4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <Input
            type="date"
            className="w-full bg-white border border-gray-300 px-3 py-2 rounded-md text-sm"
            {...register('startDate')}
          />
        </div>

        {/* End Date */}
        <div className="w-full md:w-1/4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <Input
            type="date"
            className="w-full bg-white border border-gray-300 px-3 py-2 rounded-md text-sm"
            {...register('endDate')}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 w-full md:w-1/4 md:justify-end">
          <Button
            btn="Apply"
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-6  rounded-lg w-full md:w-auto font-medium"
          />
          <Button
            type="button"
            btn={'Reset'}
            variant="outline"
            onClick={() => taskReset()}
            className=" hover:bg-gray-400 px-4 py-2 rounded-lg w-full md:w-auto bg-gray-500 text-white font-medium"
          />
        </div>
      </div>
    </form>
  );
};

export default memo(FilterBar) ;
