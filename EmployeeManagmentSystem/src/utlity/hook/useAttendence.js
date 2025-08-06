import { toast } from "react-toastify";
import attendenceServices from "../../Appwrite/Attendence";
import { getDistanceInMeters } from "../locationCordinates";
import conf from "../../config/config";
import { current } from "@reduxjs/toolkit";

export const useAttendence = () => {
  const getTodayDate = () => new Date().toISOString().slice(0, 10);

  const markAttendence = async (status, fingerprintId, user) => {
    const todayDate = getTodayDate();

    try {
      console.log("checking attendence");
      const { AttendenceTotal, checkAttendenceDocument } =
        await attendenceServices.checkAttendence(todayDate, user.userId);

      console.log("device Check");

      const { deviceTotal, checkDeviceDocument } =
        await attendenceServices.checkDevice(fingerprintId);

      if (AttendenceTotal == 0 && status == "out") {
        toast.error("Cannot Mark Out Before In ");
        return;
      } else if (
        AttendenceTotal > 0 &&
        status == "out" &&
        checkAttendenceDocument[0]?.out
      ) {
        toast.error("You Have Already Marked Out");
        return;
      } else if (AttendenceTotal > 0) {
        console.log("mkaing out marked");
        console.log(user.userId, checkAttendenceDocument, checkDeviceDocument);

        if (
          status == "out" &&
          user.userId == checkDeviceDocument[0]?.employeeId
        ) {
          const markOut = await attendenceServices.updateTheAttendence(
            checkAttendenceDocument[0].$id
          );

          if (markOut) {
            toast.success("OUT Sucessfully Marked");
            return;
          }
        } else {
          toast.error(" User Already Mark In.");
          return;
        }
      }
      // check

      if (deviceTotal > 0) {
        toast.error("Cannot Mark Two Attendence With Same Device ");
        return;
      }

      // check any oner make two attendece with same device

      if (!navigator.geolocation) {
        toast.error("Geolocation not supported.");
        return;
      }

      console.log("getting location ");

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
          console.log(latitude, longitude, conf.OFFICE_LAT, conf.OFFICE_LNG);

          console.log("saved the attendece");

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
          console.log(attendence);
          if (attendence)
            toast.success(
              `✅ Attendance ${status === "in" ? "IN" : "OUT"} successful`
            );
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
