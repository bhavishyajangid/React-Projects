import { FaBars } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from "react-toastify";
import authServices from '../../Appwrite/Auth';
import { logout } from '../../Store/authSlice';
const Navbar = ({onClose}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {currentUserDetails} = useSelector(state => state.authSlice)
  
  
  const handleLogout = () => {
    const logoutUser = authServices.logout()
    if(logoutUser){
      dispatch(logout())
      navigate("/login")
       toast.success("Logout sucessfully")
    }else{
      toast.error("Error while logout")
    }
   
  }

  // const navbarOpiton = [
  //   {
  //     tittle : "Add task",
  //     isVisible : currentUserDetails.admin || false,
  //     type : "button" ,
  //     link : "/addTask"
  //   },
  //   {
  //     tittle : "Users",
  //     isVisible : currentUserDetails.admin || false,
  //     type : "button" ,
  //     link : "/user"
  //   },
  //   {
  //    tittle : "Logout",
  //    isVisible : true,
  //    onClick : handleLogout,
  //    type : "button"
  //   },{
  //    tittle : "Admin",
  //    isVisible : true,
  //    type : "button"
  //   },
   
    


  // ]



 

  return (
    <>
       <div className="bg-teal-600 text-white flex justify-between items-center px-6 py-4 shadow-md">
        <div className='flex items-center gap-3'>

        <div className="text-xl md:text-2xl font-bold tracking-wider">{`Welcome ${currentUserDetails.userName}`}</div>
        {
          currentUserDetails.admin &&  <span className='text-sm font-medium md:block bg-white text-black   px-2 rounded shadow'>Admin</span>
        }
        </div>
        <div className="md:hidden">
          <button onClick={() => onClose()}>
            <FaBars className="text-2xl" />
          </button>
        </div>
        
       
        <button 
        onClick={() => {handleLogout()}} 
        className="hidden text-sm font-medium md:block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow">Logout</button>
      </div>
        </>
)
}

export default Navbar