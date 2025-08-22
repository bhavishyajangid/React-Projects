import { useDispatch } from "react-redux";
import { setTotal } from "../Store/attendenceSlice";

export function mergeAttendanceAndLeave(attendanceArr, leaveArr, days, month) {
  let obj = { a: {}, l: {} };
  let currentMonth = parseInt(month);

  let maxLen = Math.max(attendanceArr.length, leaveArr.length);

  for (let i = 0; i < maxLen; i++) {
    // ---- Attendance ----
    if (i < attendanceArr.length) {
      let date = parseInt(attendanceArr[i].date.slice(-2));
      if (!obj.a[date]) {
        obj.a[date] = attendanceArr[i];
      }
    }

    // ---- Leave ----
    if (i < leaveArr.length) {
      let startDate = parseInt(leaveArr[i].fromDate.slice(8, 10));
      let endDate = parseInt(leaveArr[i].toDate.slice(8, 10));
      let startDateMonth = parseInt(leaveArr[i].fromDate.slice(5, 7));
      let endDateMonth = parseInt(leaveArr[i].toDate.slice(5, 7));

      if (currentMonth !== endDateMonth) {
        endDate = days; // leave continues till end of this month
      } else if (currentMonth > startDateMonth) {
        startDate = 1; // leave started before this month
      }

      for (let j = startDate; j <= endDate; j++) {
        if (!obj.l[j]) {
          obj.l[j] = leaveArr[i];
        }
      }
    }
  }

  return obj;
}

export function selectCLR(date, month, monthRecords, total) {
  const todayDate = parseInt(new Date().toISOString().slice(8, 10));
  const currentMonth = new Date().getMonth() + 1;
  console.log(monthRecords);

  if (Object.keys(monthRecords).length === 0) {
    return { color: "bg-gray-400", reason: "No Record" };
  }

  const leaveRecord = monthRecords?.l[date];
  const attendenceRecord = monthRecords?.a[date];

  // ---- Leave ----
  if (leaveRecord?.leaveDay === "Full Day") {
    total.totalLeave += 1;
    return { color: "bg-red-400", reason: "leave" };
  } else if (leaveRecord?.leaveDay === "Half Day") {
    console.log(leaveRecord);

    total.halfDay += 1;
    total.totalLeave += 0.5;

    if (
      attendenceRecord &&
      date < todayDate &&
      parseInt(month) === currentMonth
    ) {
      let { hours } = calculateTime(
        attendenceRecord.inTime,
        attendenceRecord.outTime
      );

      if (hours >= 4) {
        total.totalAttendance += 0.5;
        return { color: "bg-yellow-400", reason: "Half Day" };
      } else {
        total.halfDay += 1;
        total.totalLeave += 0.5;
        return {
          color: "bg-red-400",
          reason: "half day leave but no attendence",
        };
      }
    }

    return {
      color: "bg-yellow-400",
      reason: "Half Day Leave Remain Attendence < 4",
    };
  }

  // ---- Future / past blank days ----
  
  if (
    (parseInt(month) === currentMonth && date >= todayDate) ||
    parseInt(month) > currentMonth ||
    (parseInt(month) < currentMonth && !attendenceRecord)
  ) {
    return { color: "bg-gray-400", reason: "No record" };
  }

  // ---- Attendance ----
  if (attendenceRecord?.in && attendenceRecord?.out) {
    let { hours, minutes } = calculateTime(
      attendenceRecord.inTime,
      attendenceRecord.outTime
    );

    if (minutes > 50) hours += 1;

    if (hours < 2) {
      total.totalLeave += 1;
      return { color: "bg-red-400", reason: "attendence < 2h" };
    } else if (hours > 3 && hours < 5) {
      total.halfDay += 1;
      total.totalAttendance += 0.5;
      return { color: "bg-yellow-400", reason: "Half Day" };
    } else if (hours < 10) {
      total.totalAttendance += 1;
      return { color: "bg-green-400", reason: "Full Day Leave" };
    } else {
      // ✅ Overtime condition
      if (Math.abs(hours - 8) > 3 && Math.abs(hours - 8) < 5) {
        total.totalAttendance += 0.5;
        total.overtime += 1;
      } else if (Math.abs(hours - 8) > 7) {
        total.totalAttendance += 1;
        total.overtime += 1;
      }

      return { color: "bg-blue-400", reason: `overtime 8h + ${hours - 8}h` };
    }
  }

  // ---- No leave, no attendance ----
  total.forgetToMark += 1;
  total.totalLeave += 1;

  return { color: "bg-red-400", reason: "no leave & no attendence" };
}

function calculateTime(inTime, outTime) {
  const parseTime = (timeStr) => {
    const [time, meridian] = timeStr.split(" ");
    let [hours, minutes, seconds] = time.split(":").map(Number);

    if (meridian === "PM" && hours !== 12) hours += 12;
    if (meridian === "AM" && hours === 12) hours = 0;

    const date = new Date();
    date.setHours(hours, minutes, seconds, 0);
    return date;
  };

  const inDate = parseTime(inTime);
  const outDate = parseTime(outTime);

  let diffMs = outDate - inDate;
  if (diffMs < 0) diffMs += 24 * 60 * 60 * 1000;

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}
