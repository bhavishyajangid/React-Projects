import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router'
import { toast } from 'react-toastify'
import dataBaseServices from '../../Appwrite/Database'
import { Loader } from '../../export'
import AddOrEditEmployee from './AddOrEditEmployee'
import EmployeeInfo from './EmployeeInfo'

const EmployeeInfoProvider = () => {
    const {employeeId} = useParams()
   const [searchParams] = useSearchParams()
   const mode = searchParams.get("mode")
   
    
    
    
    const [employee , setEmployee] = useState(null)

    useEffect(() => {
        setEmployee(null)
          const editEmployee = async() => {
              try {
                 const employeeData = await dataBaseServices.getUser(employeeId)
                 if(employeeData) setEmployee(employeeData)
              } catch (error) {
                 toast.error("employee not found try agian ")
              }
          }

          editEmployee()
    }, [employeeId])

    if(!employee) return <Loader/>
    

  return mode === "edit" ? (
    <AddOrEditEmployee employee={employee} />
  ) : (
    <EmployeeInfo employee={employee}/>
  );

}

export default EmployeeInfoProvider