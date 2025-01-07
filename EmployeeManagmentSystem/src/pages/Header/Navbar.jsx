import React from 'react'
import { Button } from '../../export'
import { Link, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../Store/authSlice'
import { toast } from "react-toastify"
import authServices from '../../Appwrite/Auth'
const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {currentUserDetails , isLogin} = useSelector(state => state.authSlice)
  
  
  const handleLogout = () => {
    const logoutUser = authServices.logout()
    if(logoutUser){
      dispatch(logout())
      navigate("/")
       toast.success("Logout sucessfully")
    }else{
      toast.error("Error while logout")
    }
   
  }
  const navbarOpiton = [
     {
      tittle : "Logout",
      isVisible : true,
      logout : handleLogout,
      type : "button"
     },
     {
      tittle : "Add task",
      isVisible : currentUserDetails.admin || false,
      type : "button" ,
      link : "/newTask"
     },

  ]
  return (
      <nav className='w-full h-20 flex justify-between items-center px-14 mt-5 max-md:px-8'>
        <div>
       
            {
           
               isLogin &&  <h1 className='text-xl font-medium  max-sm:lg'>Hello <br /> <span className='text-2xl font-medium max-md:text-xl max-sm:lg '>{currentUserDetails.userName} 👋</span>
               </h1>
           } 
           
        </div>
        
        <div className='flex gap-5'>
        {
            navbarOpiton.map((item) => (
              <Link to={item.link}>
                {
                  item.isVisible &&  <Button type={item.type} btn={item.tittle} logout={item.logout} className="bg-red-500 px-4 py-2 rounded-lg text-sm font-medium border-none hover:bg-red-600"/>
                }
               
              </Link>
            ))
        }
        </div>
      </nav>
)
}

export default Navbar