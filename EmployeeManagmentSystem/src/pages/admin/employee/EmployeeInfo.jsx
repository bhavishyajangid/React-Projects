import React from "react";

const EmployeeInfo = ({employee}) => {

//   const employee = {
//     name: "Yousaf",
//     id: "emp111",
//     email: "yousaf@example.com",
//     number: "9876543210",
//     dob: "2/13/2007",
//     gender: "male",
//     department: "Database",
//     maritalStatus: "single",
//     salary: "40000",
//     role: "Employee",
//     image:
//       "https://img.freepik.com/free-photo/handsome-young-man-smiling-while-standing-against-white-background_1298-55010.jpg"
//   };

  const details = [
    { label: "Employee ID", value: employee.userId},
    { label: "Email", value: employee.email },
    { label: "Phone", value: employee.number },
    { label: "Date of Birth", value: employee.dob },
    { label: "Gender", value: employee.gender },
    { label: "Marital Status", value: employee.maritalStatus },
    { label: "Department", value: employee.department },
    { label: "Salary", value: `₹${employee.salary}` },
  ];

  return (
    <>
    <div className=" flex justify-center mt-10">
      <div className="bg-white shadow-xl rounded-3xl overflow-hidden w-full max-w-5xl grid grid-cols-1 md:grid-cols-3">
        {/* Left Side - Profile Image */}
        <div className="bg-indigo-100 flex flex-col items-center justify-center p-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-300 shadow-md">
            <img
              src={employee.profileUrl}
              alt="Employee"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="mt-4 text-xl font-bold text-gray-800">{employee.name}</h3>
          <p className="text-sm text-gray-600">{employee.department} Dept.</p>
        </div>

        {/* Right Side - Info */}
        <div className="col-span-2 p-6 md:p-10">
          <h2 className="text-2xl font-bold text-indigo-800 mb-6 border-b pb-2 border-gray-200">
            Employee Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
            {
                details.map((item , index) => (
                    <div key={index}>
                <p className="text-sm text-gray-500 font-medium">{item.label}</p>
                <p className="text-base font-semibold text-gray-800">{item.value}</p>
              </div>
                ))
            }
          </div>
        </div>
      </div>
    </div>

    
    </>
  );
};

export default EmployeeInfo;
