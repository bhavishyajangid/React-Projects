import React, { useState } from 'react';
import { Button, FilterBar, GridCards } from '../../../export';
import { FiFilter } from "react-icons/fi";
import { IoIosAddCircle } from "react-icons/io";
import { useSelector } from 'react-redux';
const leaveData = [
  {
  leaveType : 'sick Leave' ,
  from : "9/11/2024",
  to : '10/11/2024',
  description : 'high fiver and flu',
  appliedDate : "8/11/2024",
  status : "approved"
  }
]

let optionLeave = [
  "SNO",
  "LEAVE TYPE",
  'FROM',
  'TO',
  'DESCRIPTION',
  'APPLIED DATE',
  'STATUS'
]


const LeaveHistory = () => {
  const {currentUserDetails} = useSelector(state => state.authSlice)
  const [showFilter, setShowFilter] = useState(false);

  const filteredData = leaveData

  return (
    <div className="min-h-screen  bg-gray-100 flex flex-col ">

 <GridCards/>
      <div className="w-full max-w-6xl">
        {/* 🔍 Search */}
        <div className="flex justify-between px-5  max-sm:flex-col max-sm:gap-3 mb-10 mt-5">
          <h2 className="text-2xl font-bold ">Leave History</h2>
          
          <div className='flex gap-5'>

                      <button
                        onClick={() => setShowFilter(!showFilter)}
                        className=" text-white font-medium bg-sky-500 hover:bg-sky-300 hover:text-gray-800 px-4 py-1.5  rounded-md flex items-center gap-2 "
                      >
                        <FiFilter />
                        Filter
                      </button>
                 
                 {
                  !currentUserDetails.admin &&  <button className='px-4 py-2 bg-teal-500 text-white font-semibold rounded-lg text-sm flex justify-center items-center gap-2'>
                  <IoIosAddCircle  className='text-xl' />
                   Apply Leave
                 </button>
                 }
                
          </div>
                    
        </div>
        {
           showFilter && <FilterBar/>
        }
         

        {/* 🖥️ Desktop Table View */}
        <div className="hidden mt-10 sm:block overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-md text-sm">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="py-2 px-4 border">SNO</th>
                <th className="py-2 px-4 border">LEAVE TYPE</th>
                <th className="py-2 px-4 border">FROM</th>
                <th className="py-2 px-4 border">TO</th>
                <th className="py-2 px-4 border">DESCRIPTION</th>
                <th className="py-2 px-4 border">APPLIED DATE</th>
                <th className="py-2 px-4 border">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={index} className="text-center border-t hover:bg-gray-50">
                    <td className="py-2 px-4 border">{index + 1}</td>
                    <td className="py-2 px-4 border text-blue-600 font-medium">{item.leaveType}</td>
                    <td className="py-2 px-4 border">{item.from}</td>
                    <td className="py-2 px-4 border">{item.to}</td>
                    <td className="py-2 px-4 border">{item.description}</td>
                    <td className="py-2 px-4 border font-semibold">{item.appliedDate}</td>
                    <td className="py-2 px-4 border">{item.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 📱 Mobile Card View */}
        <div className="sm:hidden space-y-4">
          {filteredData.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No records found.</div>
          ) : (
            filteredData.map((item, index) => {
              const fields = [
                { label: 'LEAVE TYPE', value: item.leaveType, },
                { label: 'FROM', value: `₹${item.from}` },
                { label: 'TO', value: `₹${item.to}` },
                { label: 'DESCRIPTION', value: `₹${item.description}` },
                { label: 'APPLIED DATE', value: `₹${item.appliedDate}` },
                { label: 'STATUS', value: item.status },
              ];

              return (
                <div key={index} className="bg-white shadow rounded-lg p-4 border text-sm space-y-1">
                  <div className="mb-2 flex justify-between text-gray-600 font-semibold">
                    <span>SNO:</span>
                    <span>{index + 1}</span>
                  </div>
                  {fields.map((field, i) => (
                    <div className='flex justify-between items-center' key={i}>
                      <span className='font-semibold text-gray-600'>{field.label}</span>
                      <span className={`${field.label == 'EMP ID' ? "text-blue-400 font-semibold" : "text-[#141414] "}`}>{field.value}</span>
                    </div>
                  ))}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveHistory;
