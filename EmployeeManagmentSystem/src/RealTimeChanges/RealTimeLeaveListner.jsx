import { memo, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import LeaveServices from "../Appwrite/Leave"
import conf from '../config/config'
import { setRealTimeLeave, setUpdateLeaveRealTime } from "../Store/leaveSlice"
const RealTimeLeaveListner = () => {
    const dispatch = useDispatch()
    const {currentUserDetails} = useSelector(state => state.authSlice)
    const subscriptionRef = useRef(null)
    const {leaveByEmployee} = useSelector(state => state.leaveSlice)
    useEffect(() => {
        if(!currentUserDetails) return 

        subscriptionRef.current = LeaveServices.client.subscribe(
            `databases.${conf.appwriteDatabaseId}.collections.${conf.appwriteLeaveCollectionId}.documents` , 
            (res) => {
                const payload = res.payload
                const isAdmin  = currentUserDetails.admin
if (res.events.some(event => event.endsWith('.create'))) {
    dispatch(setRealTimeLeave({empId : payload.employeeId , leave : payload }))
}

                 if (res.events.includes("databases.*.collections.*.documents.*.update")) {
                    console.log(leaveByEmployee);
                    
                          dispatch(setUpdateLeaveRealTime(payload))
                          
                        }

                         if (res.events.includes("databases.*.collections.*.documents.*.delete")) {
                                 console.log('delete', payload);
                                 
                                }

            }
        )

        return () => {
            if(subscriptionRef.current) subscriptionRef.current()
        }

    } , [currentUserDetails , dispatch])

    return null
}

export default memo(RealTimeLeaveListner) 