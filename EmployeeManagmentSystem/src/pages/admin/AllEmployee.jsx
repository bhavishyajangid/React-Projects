import React, { useCallback, useEffect, useState } from 'react';
import dataBaseServices from '../../Appwrite/Database';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import UserCard from '../../components/UserCard';
import { ChatBox, UserSkeleton } from '../../export';
import { useSelector } from 'react-redux';

const AllEmployee = () => {
   const {allEmployee} = useSelector(state => state.authSlice)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  const deleteUser = useCallback(async (userId) => {
    setLoading(true);
    try {
      const res = await dataBaseServices.deleteUserFromDatabase(userId);
      if (res) {
        toast.success("User Deleted Successfully");
        setAllUser(prev => prev.filter(item => item.userId !== userId));
        navigate("/user");
      }
    } catch (error) {
      toast.error(error.message || "Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  if (!allEmployee) return <UserSkeleton />;

  return (
   <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Manage Employees</h2>
        <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 shadow">
          Add New Employee
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search By Employee ID"
          className="w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-teal-200"
        />
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg bg-white">
        <table className="min-w-full table-auto text-sm text-left text-gray-700">
          <thead className="bg-gray-200 text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-3">S No</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">DOB</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {allEmployee.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No employees found.
                </td>
              </tr>
            ) : (
              allEmployee.map((emp, index) => (
                <tr key={emp.$id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">
                    <img
                      src={emp.profileImage || '/default-avatar.png'}
                      alt="profile"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-3 capitalize">{emp.userName}</td>
                  <td className="px-4 py-3">{emp.dob || 'N/A'}</td>
                  <td className="px-4 py-3">{emp.department || 'N/A'}</td>
                  <td className="px-4 py-3 flex gap-2 flex-wrap">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded shadow">
                      View
                    </button>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded shadow">
                      Edit
                    </button>
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded shadow">
                      Salary
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow">
                      Leave
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>

  );
};

export default AllEmployee;
