import { useEffect, useMemo, useState } from 'react';
import { FaFilter } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import { toast } from 'react-toastify';
import { handleFetchAllUser } from '../../../Store/thunks/userThunk';
import { AllemployeeShimmer, UserSkeleton } from '../../../export';
const AllEmployee = () => {
  const { allEmployee , loader} = useSelector(state => state.authSlice)
  const [inputVal, setInputVal] = useState("")
  const [department, setDepartment] = useState("")
  const [filter, setFilter] = useState(false)
  const dispatch = useDispatch()
  


  const filteredEmployees = useMemo(() => {
    if (!inputVal.trim() && !department) return allEmployee;

    return allEmployee.filter(emp => {
      const matchesDept = department ? emp.department === department : true;
      const matchesName = inputVal.trim()
        ? emp.userName?.toLowerCase().includes(inputVal.toLowerCase())
        : true;
      return matchesDept && matchesName;
    });
  }, [inputVal, department, allEmployee]);

   useEffect(() => {
    const fetchAllEmployee = async() => {

      if(allEmployee.length > 0)return 

     try {
     await dispatch(handleFetchAllUser()).unwrap() 
     } catch (error) {
       toast.error(error)
     }
     }
     fetchAllEmployee()
   },[dispatch])


  const actionButtons = (emp) => [
    {
      name: "View",
      link: `/editEmployee/${emp.userId}?mode=view`,
      bg: "bg-blue-500 hover:bg-blue-600",
    },
    {
      name: "Edit",
      link: `/editEmployee/${emp.userId}?mode=edit`,
      bg: "bg-green-500 hover:bg-green-600",
    },
    { 
      name: "Salary",
      link: `/salaryhistory/${emp.userId}`,
      bg: "bg-yellow-400 hover:bg-yellow-500",
    },
    {
      name: "Leave",
      link: `/leavehistory/${emp.userId}`,
      bg: "bg-red-500 hover:bg-red-600",
    },
  ];


  if (loader) return <AllemployeeShimmer/>

  return (
    <>
      <div className="p-4 bg-gray-100 max-sm:p-2 max-sm:hidden ">
        <div className="flex justify-between mb-10 max-sm:flex-col max-sm:justify-start max-sm:gap-5">
          <div className='flex justify-between items-center'>
            <h2 className="text-2xl font-semibold text-gray-800">Manage Employees</h2>
            <button onClick={() => setFilter(prev => !prev)} className='sm:hidden px-4 py-2 bg-blue-400 text-sm text-white font-semibold rounded-lg flex gap-2 items-center'> <span><FaFilter /></span>Filter</button>
          </div>


          <div className={`gap-3 ${filter ? 'flex' : 'hidden'} sm:flex`}>
            <div>
              <select onChange={(e) => {
                setDepartment(e.target.value)
              }} className='px-4 py-1.5 rounded-lg text-sm border border-gray-200'>
                <option value="" className=''>Department</option>
                <option value="Tech" className=''>Tech</option>
                <option value="HR" className=''>HR</option>
                <option value="Marketing" className=''>Marketing</option>

              </select>
            </div>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => { setInputVal(e.target.value) }}
              placeholder="Search By Employee Name "
              className="w-64 px-4 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-teal-200"
            />
          </div>
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
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No employees found.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp, index) => (
                  <tr key={emp.$id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">
                      <img
                        src={emp.profileUrl || '/default-avatar.png'}
                        alt="profile"
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-4 py-3 capitalize">{emp.userName}</td>
                    <td className="px-4 py-3">{emp.dob || 'N/A'}</td>
                    <td className="px-4 py-3">{emp.department || 'N/A'}</td>
                    <td className="px-4 py-3 flex gap-2 flex-wrap">
                      {actionButtons(emp).map((btn, i) => (
                        <Link to={btn.link} key={i}>
                          <button className={`${btn.bg} text-white px-3 py-1 rounded shadow text-sm`}>
                            {btn.name}
                          </button>
                        </Link>
                      ))}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>


      {/* mobile view  */}

      <div className="sm:hidden space-y-4">
        {filteredEmployees.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No employees found.</div>
        ) : (
          filteredEmployees.map((employee) => (
            <div key={employee.$id} className="bg-white shadow rounded-lg p-4 border">
              <div className="flex items-center gap-4 mb-2">
                <img
                  src={employee.profileUrl || '/default-avatar.png'}
                  alt="profile"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <div className="text-lg font-semibold capitalize">{employee.userName}</div>
                  <div className="text-sm text-gray-500">{employee.department || 'N/A'}</div>
                </div>
              </div>
              <div className="text-sm text-gray-700 mb-2">
                DOB: {employee.dob || 'N/A'}
              </div>
              <div className="flex flex-wrap justify-end gap-2">
                <Link to={`/editEmployee/${employee.userId}?mode=view`}>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded shadow text-sm">
                    View
                  </button>
                </Link>
                <Link to={`/editEmployee/${employee.userId}?mode=edit`}>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded shadow text-sm">
                    Edit
                  </button>
                </Link>
                <Link to={`/salaryhistory/${employee.userId}`}>
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded shadow text-sm">
                    Salary
                  </button>
                </Link>
                <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow text-sm">
                  Leave
                </button>
              </div>
            </div>

          ))
        )}
      </div>

    </>


  );
};

export default AllEmployee;
