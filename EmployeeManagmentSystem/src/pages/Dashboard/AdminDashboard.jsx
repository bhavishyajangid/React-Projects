import {
  FaBuilding,
  FaMoneyBill,
  FaUsers
} from 'react-icons/fa';
import { PastTaskInfo } from '../../export';

const AdminDashboard = () => {
   const dashboardStats = [
  {
    id: 'employees',
    label: 'Total Employees',
    value: 4,
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
    <div className='flex flex-col gap-10'>
    <PastTaskInfo option={dashboardStats} heading={"Dashboard Overview"}/>
    </div>
    </>
  )
}

export default AdminDashboard