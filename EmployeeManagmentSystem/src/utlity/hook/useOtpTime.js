import { useState , useEffect , useRef} from "react";
import { useSelector } from "react-redux";

export function useOtpTimer(startTime = 60) {
  const [second, setSecond] = useState(startTime);
  const { otpSend, resend } = useSelector((state) => state.otpSendSlice);
  const intervalRef = useRef(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setSecond(startTime);
  }, [otpSend, resend]);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (second === 0) return;

    intervalRef.current = setInterval(() => {
      setSecond((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [otpSend, resend]); // Set up on otpSend or resend

  return second;
}
