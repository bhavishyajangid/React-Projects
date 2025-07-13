import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Button from './Button';
import Input from './Input';

const FilterBar = ({filterTask , resetTask , dropDownOption , dropDownName}) => {
  const {currentUserDetails} = useSelector(state=> state.authSlice)
  const { register, handleSubmit, reset } = useForm();

  
   const taskReset = () => {
     reset()
     resetTask()
   }

  return (
    <form
      onSubmit={handleSubmit(filterTask)}
      className="w-full p-4 rounded-xl shadow-lg  space-y-6 mb-10 "
    >
      <div className="flex flex-col md:flex-row md:items-end gap-6">
        {/* Employee Dropdown */}
      

        {/* Start Date */}
        <div className="w-full md:w-1/4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            From
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
            To
          </label>
          <Input
            type="date"
            className="w-full bg-white border border-gray-300 px-3 py-2 rounded-md text-sm"
            {...register('endDate')}
          />
        </div>

         { (dropDownName) &&  <div className="w-full md:w-1/4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {dropDownName}
          </label>
          <select
            className="w-full bg-white border border-gray-300 text-sm px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            {...register(`${dropDownName == 'Status' ? "Status" : "employeeId"}`)}
          >
            <option value="">{dropDownName}</option>
            {dropDownOption.map((item , index) => (
              <option key={item.$id || index} value={item.userId || item.userName} >
                {item.userName}
              </option>
            ))}
          </select>
        </div>}

        {/* Buttons */}
        <div className="flex gap-2 w-full md:w-1/4 md:justify-end">
          <Button
            label='Apply'
            className="bg-green-500 hover:bg-green-600 text-white px-6  rounded-lg w-full md:w-auto font-medium"
          />
          <Button
            label='Reset'
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
