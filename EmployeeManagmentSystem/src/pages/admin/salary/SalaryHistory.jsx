import React, { useCallback, useEffect, useRef, useState } from "react";
import { data, useParams } from "react-router";
import dataBaseServices from "../../../Appwrite/Database";
import { toast } from "react-toastify";
import { FilterBar, Loader } from "../../../export";
import { FiFilter } from "react-icons/fi";
import { setLoader } from "../../../Store/otpSendSlice";

const dropDownOption = [
  { userName: "Pending" },
  { userName: "Approved" },
  { userName: "Cancelled" },
];

const SalaryHistory = () => {
  const [loading, setLoading] = useState(true);
  let salaryHistory = useRef([]);
  const { empId } = useParams();
  const [showFilter, setShowFilter] = useState(false);
  const [filterData, setFilterData] = useState([]);
  useEffect(() => {
    const fetchUserSalaryHistory = async () => {
      try {
        const salary = await dataBaseServices.fetchSalaryHistory(empId);
        if (salary) {
          setFilterData(salary);
          salaryHistory.current = salary;
        }
      } catch (error) {
        toast.error(error.message || "Failed to fetch salary history");
      } finally {
        setLoading(false);
      }
    };
    fetchUserSalaryHistory();
  }, [empId]);

  const filterTask = useCallback(async (data) => {
    if (data.startDate == "" && data.endDate == "") return;

    setLoading(true);
    try {
      const result = await dataBaseServices.filterSalary(data);
      if (result) {
        setFilterData(result);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const resetTask = useCallback(async () => {
    setFilterData(salaryHistory.current);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="w-full max-w-6xl mx-auto px-4">
        {/* Header and Filters */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-10 mt-5">
          <h2 className="text-2xl font-bold">Salary History</h2>
          <button
            onClick={() => {
              setShowFilter(!showFilter);
            }}
            className=" text-white font-medium bg-sky-500 hover:bg-sky-300 hover:text-gray-800 px-4 py-1.5  rounded-md flex items-center gap-2 "
          >
            <FiFilter />
            Filter
          </button>
        </div>
        {showFilter && (
          <FilterBar
            resetTask={resetTask}
            filterTask={filterTask}
            dropDownOption={dropDownOption}
          />
        )}

        {/* Desktop Table View */}
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
              {filterData.length > 0 ? (
                filterData.map((item, index) => (
                  <tr
                    key={index}
                    className="text-center border-t hover:bg-gray-50"
                  >
                    <td className="py-2 px-4 border">{index + 1}</td>
                    <td className="py-2 px-4 border text-blue-600 font-medium">
                      {item.employeeId}
                    </td>
                    <td className="py-2 px-4 border">₹ {item.salary}</td>
                    <td className="py-2 px-4 border">₹ {item.allowance}</td>
                    <td className="py-2 px-4 border">₹ {item.deductions}</td>
                    <td className="py-2 px-4 border font-semibold">
                      ₹{" "}
                      {parseInt(item.salary) +
                        parseInt(item.allowance) -
                        parseInt(item.deductions)}
                    </td>
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

        {/* Mobile Card View */}
        <div className="sm:hidden space-y-4">
          {filterData.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No records found.
            </div>
          ) : (
            filterData.map((item, index) => {
              const total =
                parseInt(item.salary) +
                parseInt(item.allowance) -
                parseInt(item.deductions);
              const fields = [
                { label: "EMP ID", value: item.employeeId },
                { label: "SALARY", value: `₹${item.salary}` },
                { label: "ALLOWANCE", value: `₹${item.allowance}` },
                { label: "DEDUCTION", value: `₹${item.deductions}` },
                { label: "TOTAL", value: `₹${total}` },
                { label: "PAY DATE", value: item.payDate },
              ];

              return (
                <div
                  key={index}
                  className="bg-white shadow rounded-lg p-4 border text-sm space-y-1"
                >
                  <div className="mb-2 flex justify-between text-gray-600 font-semibold">
                    <span>SNO:</span>
                    <span>{index + 1}</span>
                  </div>
                  {fields.map((field, i) => (
                    <div className="flex justify-between items-center" key={i}>
                      <span className="font-semibold text-gray-600">
                        {field.label}
                      </span>
                      <span
                        className={`${
                          field.label === "EMP ID"
                            ? "text-blue-400 font-semibold"
                            : "text-[#141414]"
                        }`}
                      >
                        {field.value}
                      </span>
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
