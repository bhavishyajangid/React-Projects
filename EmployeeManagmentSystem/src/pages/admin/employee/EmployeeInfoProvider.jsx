import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router'
import { toast } from 'react-toastify'
import dataBaseServices from '../../../Appwrite/Database'
import { Loader } from '../../../export'
import AddOrEditEmployee from './AddOrEditEmployee'
import EmployeeInfo from './EmployeeInfo'
import { useSelector } from 'react-redux'

const EmployeeInfoProvider = () => {
  const {allEmployee} = useSelector(state => state.authSlice)
    const {employeeId} = useParams()
   const [searchParams] = useSearchParams()
   const mode = searchParams.get("mode")
   
    
    let index = allEmployee.findIndex((item) => item.userId == employeeId)
    let employee = index >= 0 ? allEmployee[index] : {}


 

  return mode === "edit" ? (
    <AddOrEditEmployee employee={employee} />
  ) : (
    <EmployeeInfo employee={employee}/>
  );

}

export default EmployeeInfoProvider