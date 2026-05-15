import { useState, useEffect } from "react";
 
 export default function useCountDown(countDownStart) {
   const [seconds, setSeconds] = useState(countDownStart);

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");

  const remainingSeconds = String(seconds % 60).padStart(2, "0");
    

  return {
    seconds,
    setSeconds,
    formattedTime: `${minutes}:${remainingSeconds}`,
  };

}