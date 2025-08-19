import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import attendenceServices from "../../Appwrite/Attendence";
import {
  setAttendence,
  setAttendenceMarkedIn,
  setAttendenceMarkedOut,
} from "../../Store/attendenceSlice";
import conf from "../../config/config";
import { getDistanceInMeters } from "../locationCordinates";
import LeaveServices from "../../Appwrite/Leave";
import { formatDate } from "../formateDate";

export const useAttendence = () => {
  const getTodayDate = () => new Date().toISOString().slice(0, 10);
  const dispatch = useDispatch();
  const { attendenceInData } = useSelector((state) => state.attendenceSlice);
  
  const markAttendence = async (status, fingerprintId, user) => {
    const todayDate = getTodayDate();

    try {
   let date = formatDate(todayDate)
   const todayLeaveFound = await LeaveServices.checkLeave(date)
   console.log(todayLeaveFound);
   
   if(todayLeaveFound){
     toast.error('Cannot Mark Attendece Because Leave Applyed of Today'
     )
     return
   }


      const { deviceTotal, checkDeviceDocument } =
        await attendenceServices.checkDevice(fingerprintId);
      console.log(attendenceInData);

      if (status == "out" && user.userId == checkDeviceDocument?.employeeId) {
        const markOut = await attendenceServices.updateTheAttendence(
          attendenceInData?.$id
        );

        if (markOut) {
          dispatch(setAttendenceMarkedOut({date : todayDate.slice(-2) , attendence : markOut}));
          toast.success("OUT Sucessfully Marked");
          return;
        }
      }

      const response = await fetch("https://ipwho.is/");
      const data = await response.json();
      console.log(data);

      if (deviceTotal > 0) {
        toast.error("Cannot Mark Two Attendence With Same Device ");
        return;
      }

      // check any oner make two attendece with same device

      if (!navigator.geolocation) {
        toast.error("Geolocation not supported.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const distance = getDistanceInMeters(
            latitude,
            longitude,
            conf.OFFICE_LAT,
            conf.OFFICE_LNG
          );

          if (distance > conf.ALLOWED_RADIUS) {
            toast.error("You are not at the office");
            console.log(latitude, longitude, conf.OFFICE_LAT, conf.OFFICE_LNG);
            return;
          }

          const attendence = await attendenceServices.setAttendence({
            employeeId: user.userId,
            fingerprintId,
            date: todayDate,
            status,
            inTime: new Date().toLocaleTimeString("en-us", { hour12: true }),
            outTime: "",
            day: new Date().toLocaleDateString("en-US", { weekday: "long" }),
            in: true,
          });

          if (attendence) {
            dispatch(setAttendenceMarkedIn(attendence))
            toast.success(
              `✅ Attendance ${status === "in" ? "IN" : "OUT"} successful`
            );
          }
        },
        (err) => {
          console.error(err);
          toast.error("❌ Failed to get location.");
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 0,
        }
      );
    } catch (error) {
      toast.error(error);
      console.log(error);
      throw error;
    }
  };

  return { markAttendence };
};
