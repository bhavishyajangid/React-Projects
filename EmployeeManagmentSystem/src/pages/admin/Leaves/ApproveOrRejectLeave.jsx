import React, { useEffect } from 'react'
import LeaveHistory from './LeaveHistory'
import { useDispatch, useSelector } from 'react-redux'
import dataBaseServices, { databaseServices } from '../../../Appwrite/Database'
const ApproveOrRejectLeave = () => {
  const {allLeave} = useSelector(state => state.leaveSlice)
  const dispatch = useDispatch()

  useEffect(() => {
    //  try {
    //   const result = await dataBaseServices.
    //  } catch (error) {
      
    //  }
  })

  return (
    <div>ApproveOrRejectLeave

      <LeaveHistory/>
    </div>
  )
}

export default ApproveOrRejectLeave