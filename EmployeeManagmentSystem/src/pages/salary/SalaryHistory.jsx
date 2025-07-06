import React, { useState } from 'react';

const salaryData = [
  {
    empId: 'yousaf222',
    salary: 1000,
    allowance: 50,
    deduction: 40,
    total: 1010,
    payDate: '9/11/2024',
  },  {
    empId: 'yousaf222',
    salary: 1000,
    allowance: 50,
    deduction: 40,
    total: 1010,
    payDate: '9/11/2024',
  },
  // Add more data as needed
];

const SalaryHistory = () => {
  const [search, setSearch] = useState('');

  const filteredData = salaryData.filter(item =>
    item.empId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen  bg-gray-100 flex flex-col ">

      <div className="w-full max-w-6xl">
        {/* 🔍 Search */}
        <div className="flex justify-between  max-sm:flex-col max-sm:gap-3 mb-10 mt-5">
      <h2 className="text-2xl font-bold ">Salary History</h2>
          <input
            type="text"
            placeholder="Search By Emp ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 text-sm w-full sm:w-64"
          />
        </div>

        {/* 🖥️ Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-md text-sm">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="py-2 px-4 border">SNO</th>
                <th className="py-2 px-4 border">EMP ID</th>
                <th className="py-2 px-4 border">SALARY</th>
                <th className="py-2 px-4 border">ALLOWANCE</th>
                <th className="py-2 px-4 border">DEDUCTION</th>
                <th className="py-2 px-4 border">TOTAL</th>
                <th className="py-2 px-4 border">PAY DATE</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={index} className="text-center border-t hover:bg-gray-50">
                    <td className="py-2 px-4 border">{index + 1}</td>
                    <td className="py-2 px-4 border text-blue-600 font-medium">{item.empId}</td>
                    <td className="py-2 px-4 border">{item.salary}</td>
                    <td className="py-2 px-4 border">{item.allowance}</td>
                    <td className="py-2 px-4 border">{item.deduction}</td>
                    <td className="py-2 px-4 border font-semibold">{item.total}</td>
                    <td className="py-2 px-4 border">{item.payDate}</td>
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
                { label: 'EMP ID', value: item.empId,},
                { label: 'SALARY', value: `₹${item.salary}` },
                { label: 'ALLOWANCE', value: `₹${item.allowance}` },
                { label: 'DEDUCTION', value: `₹${item.deduction}` },
                { label: 'TOTAL', value: `₹${item.total}` },
                { label: 'PAY DATE', value: item.payDate },
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

export default SalaryHistory;
