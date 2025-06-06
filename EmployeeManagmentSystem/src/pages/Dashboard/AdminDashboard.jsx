import {
  FaBuilding,
  FaMoneyBill,
  FaUsers
} from 'react-icons/fa';
import { GridCards } from '../../export';
import { useEffect } from 'react';
import dataBaseServices from '../../Appwrite/Database';
import { showError } from '../../utlity/Error&Sucess';
import { useDispatch, useSelector } from 'react-redux';
import { setAllEmployee } from '../../Store/authSlice';

const AdminDashboard = () => {
  const {allEmployee} = useSelector(state => state.authSlice)
  const dispatch = useDispatch()

   const dashboardStats = [
  {
    id: 'employees',
    label: 'Total Employees',
    value: allEmployee.length,
    icon: <FaUsers/>,
    color: 'teal-500',
  },
  {
    id: 'departments',
    label: 'Total Departments',
    value: 3,
    icon: <FaBuilding/>,
    color: 'yellow-500',
  },
  {
    id: 'pay',
    label: 'Monthly Pay',
    value: '$1900',
    icon: <FaMoneyBill/>,
    color: 'red-500',
  },
]; 

   useEffect(() => {
    const fetchAllEmployee = async() => {

      try {
        const res = await dataBaseServices.getAllUser()
        if(res){
          
           dispatch(setAllEmployee(res.documents))
        }
      } catch (error) {
        showError(error.message)
      }
    }

    fetchAllEmployee()
   } ,[dispatch])

   

  return (
    <>
    <div className='flex flex-col gap-10 py-2 px-3'>
    <GridCards option={dashboardStats} heading={"Dashboard Overview"}/>
    </div>
    </>
  )
}

export default AdminDashboard