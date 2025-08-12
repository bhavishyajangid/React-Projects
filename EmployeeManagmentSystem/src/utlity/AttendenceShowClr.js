
export function prepareAttendanceMap(allAttendance) {
  const map = new Map();

  for (const record of allAttendance) {
    const day = record.date.slice(-2); // last 2 characters = day
    map.set(day, record);
  }

  return map;
}

 export function selectCLR(date, attendanceMap , month) {
 
    const todayDate = new Date().toISOString().slice(8, 10)
    const currentMonth = new Date().toISOString().slice(6, 7)
    

    if(attendanceMap.size < 1 || (parseInt(currentMonth) == month && date) >  parseInt(todayDate)) return 'bg-gray-400'

  const record = attendanceMap.get(String(date).padStart(2, "0"));
  
  if (!record) return "bg-red-400"; // No record

  if (record.status == 'out') {
    let { hours, minutes } = calculateTime(record.inTime, record.outTime);

    // Round up minutes
    if (minutes > 0) hours += 1;

    if (hours < 2) {
      return "bg-red-400";
    } else if (hours < 5) {
      return "bg-yellow-400";
    } else if (hours < 9) {
      return "bg-green-400";
    } else {
      return "bg-blue-400";
    }
  }

  return "bg-red-400"; // Missing in or out time
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