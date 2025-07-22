import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import LeaveServices from "../Appwrite/Leave"
import conf from '../config/config'
import { setRealTimeLeave } from "../Store/leaveSlice"
const RealTimeLeaveListner = () => {
    const dispatch = useDispatch()
    const {currentUserDetails} = useSelector(state => state.authSlice)
    const subscriptionRef = useRef(null)

    useEffect(() => {
        if(!currentUserDetails) return 

        subscriptionRef.current = LeaveServices.client.subscribe(
            `databases.${conf.appwriteDatabaseId}.collections.${conf.appwriteLeaveCollectionId}.documents` , 
            (res) => {
                const payload = res.payload
                const isAdmin  = currentUserDetails.admin
if (res.events.some(event => event.endsWith('.create'))) {
    dispatch(setRealTimeLeave({empId : payload.employeeId , leave : payload , currentUser : currentUserDetails.userId}))
}

                 if (res.events.includes("databases.*.collections.*.documents.*.update")) {
                          console.log('update' , payload);
                          
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

export default RealTimeLeaveListner