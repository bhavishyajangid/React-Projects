import { toast } from "react-toastify"
import attendenceServices from "../../Appwrite/Attendence"
import { getDistanceInMeters } from "../locationCordinates"
import conf from "../../config/config"

export const useAttendence = () => {
    const getTodayDate = () =>  new Date().toISOString().slice(0, 10)

    const markAttendence = async(status , fingerprintId , user) => {

        if(!fingerprintId){
            toast.error('Fingerprint Not Recornize Try Again')
            return
        }
        
        const todayDate = getTodayDate()

        try {
            // const checkAttendece = await attendenceServices.checkAttendence(fingerprintId , todayDate)

            // if(checkAttendece.total > 0){
            //      toast.error(" This device already marked attendance today.")
            //      return
            // }

            if(!navigator.geolocation()){
                toast.error('Geolocation not supported.')
                return
            }


            navigator.geolocation.getCurrentPosition(async(position) => {
                const { latitude, longitude} = position.coords
                const distance = getDistanceInMeters(
                    latitude,
                    longitude,
                    conf.OFFICE_LAT,
                    conf.OFFICE_LNG
                )

                if(distance > conf.ALLOWED_RADIUS){
                    toast.error('You are not at the office')
                    return
                }

                const attendence = await attendenceServices.setAttendence({
                    employeeId : user.userId,
                    fingerprintId,
                    latitude,
                    longitude,
                    date : todayDate,
                    status
                })

                 toast.success(`✅ Attendance ${status === "in" ? "IN" : "OUT"} successful`);

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
        )

        } catch (error) {
            console.log(error);
            
            toast.error(error)
        }


    }

    return {markAttendence}
}