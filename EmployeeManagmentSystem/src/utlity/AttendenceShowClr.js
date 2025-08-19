import { Result } from "postcss";
import { useSelector } from "react-redux";

export  function storedInObj(arr){
         let obj = {}
         
         for (let i = 0; i < arr.length; i++) {
          let date = parseInt(arr[i].date.slice(-2))
            obj[date]  = arr[i]  
         }
   return obj
}

export function storeLeaveInObj(arr){
  let obj = {}
  
  for (let i = 0; i < arr.length; i++) {
      let start = parseInt(arr[i].totalDays)
       let startDate = parseInt(arr[i].fromDate.slice(0,2))
 

       if(start == 0){
          if(!obj[startDate]){
             obj[startDate] = arr[i]
          }
       }else{
          while(start > 0){
             if(!obj[startDate]){
               obj[startDate] = arr[i]
             }
             startDate++
             start--
          }
       }

     
      
    }
console.log(obj);

}

 export function selectCLR(date, month , monthRecords) {
    const todayDate = parseInt(new Date().toISOString().slice(8, 10))
    const currentMonth = parseInt(new Date().toISOString().slice(6, 7))
    

    // console.log(month , date , monthRecords);

    if (!monthRecords || Object.keys(monthRecords).length === 0) {
    return "bg-gray-400";
  }
    
    const record = monthRecords?.[date]
   
  

     if (!record) {
    // Future date of current month → gray

    console.log(month , currentMonth , date , todayDate);
    
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