
export function mergeAttendanceAndLeave(attendanceArr, leaveArr, days, month) {
  let obj = { a: {}, l: {} };
  let currentMonth = parseInt(month);

  // ---- Attendance ----
  for (let i = 0; i < attendanceArr.length; i++) {
    let date = parseInt(attendanceArr[i].date.slice(-2));
    if(!obj.a[date]){
      obj.a[date] = attendanceArr[i];
    }
  }

  // ---- Leave ----
  for (let i = 0; i < leaveArr.length; i++) {
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
     if(!obj.l[j]){
      obj.l[j] = leaveArr[i];
    }
    }
  }

  return obj;
}



export function selectCLR(date, month, monthRecords) {
  const todayDate = parseInt(new Date().toISOString().slice(8, 10));
  const currentMonth = parseInt(new Date().toISOString().slice(6, 7));

  // console.log(month , date , monthRecords);

  if (!monthRecords || Object.keys(monthRecords).length === 0) {
    return "bg-gray-400";
  }

  console.log(monthRecords , 'monthresord');
  
  const record = monthRecords?.[date];

  if (!record) {
    // Future date of current month → gray

    // console.log(month , currentMonth , date , todayDate);

    if (month == currentMonth && date >= todayDate) {
      return "bg-gray-400";
    }

    return "bg-red-400"; // No record found
  }

  if (record.in && record.out) {
    let { hours, minutes } = calculateTime(record.inTime, record.outTime);

    // Round up minutes
    if (minutes > 0) hours += 1;

    if (hours < 2 && record?.out) {
      return "bg-red-400";
    } else if (hours < 5) {
      return "bg-yellow-400";
    } else if (hours < 9) {
      return "bg-green-400";
    } else {
      return "bg-blue-400";
    }
  }

  return "bg-gray-400"; // Missing in or out time
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
