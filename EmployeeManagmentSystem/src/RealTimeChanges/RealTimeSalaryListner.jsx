import { memo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import SalaryServices from "../Appwrite/Salary";
import conf from "../config/config";
import { addRealTimeLeave, updateLeaveRealTime } from "../Store/leaveSlice";
import { addRealTimeSalary } from "../Store/salarySlice";
const RealTimeSalaryListner = () => {
  const dispatch = useDispatch();
  const { currentUserDetails } = useSelector((state) => state.authSlice);
  const subscriptionRef = useRef(null);
  useEffect(() => {
    if (!currentUserDetails) return;

    subscriptionRef.current = SalaryServices.client.subscribe(
      `databases.${conf.appwriteDatabaseId}.collections.${conf.appwriteSalaryCollectionId}.documents`,
      (res) => {
        const payload = res.payload;

        if (res.events.some((event) => event.endsWith(".create"))) {
         console.log(payload);
           dispatch(addRealTimeSalary({empId : payload.employeeId , payload}))
        }

        if (
          res.events.includes("databases.*.collections.*.documents.*.update")
        ) {
            console.log(payload);
            
          dispatch(updateLeaveRealTime({leave : payload , isAdminPage : currentUserDetails.admin}));
        }

        if (
          res.events.includes("databases.*.collections.*.documents.*.delete")
        ) {
          console.log("delete", payload);
        }
      }
    );

    return () => {
      if (subscriptionRef.current) subscriptionRef.current();
    };
  }, [currentUserDetails, dispatch]);

  return null;
};

export default memo(RealTimeSalaryListner);
