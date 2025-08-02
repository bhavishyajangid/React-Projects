import { memo } from 'react';
import {
  FaBuilding,
  FaMoneyBill,
  FaUsers
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { GridCards } from '../../export';

const AdminDashboard = () => {
  const {allEmployeeCount} = useSelector(state => state.authSlice)

  
   const dashboardStats = [
  {
    id: 'employees',
    label: 'Total Employees',
    value: allEmployeeCount,
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

   

   

  return (
    <>
    <div className='flex flex-col gap-10 py-2 px-3'>
    <GridCards option={dashboardStats} heading={"Overview"}/>
    </div>
    </>
  )
}

export default memo(AdminDashboard) 