
import './App.css'
import { useState , useEffect } from 'react';
import {  CardSkeleton, Navbar} from './export.js'
import { Outlet, useNavigate} from 'react-router'
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import authServices from './Appwrite/Auth.js'
import dataBaseServices from './Appwrite/Database.js'
import { Loader } from './export.js';
import { Suspense , lazy } from 'react';
import authSlice, { login } from './Store/authSlice.js';
import RealTimeTaskListner from './components/RealTimeTaskListner.jsx';
import { fetchTask } from './Store/TaskSlice.js';


function App() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loader , setLoader] = useState(true)
    const{isLogin} = useSelector(state => state.authSlice)


     useEffect(() => {
       const checkLogin = async () => {
         try {
          const userData  = await authServices.getCurrentUser()
            dispatch(login(userData))
            dispatch(fetchTask(userData))
            userData.admin ? navigate("/admin") :  navigate("/employee")
         } catch (error) {
           toast.error("Something Went Wrong")
           navigate("/")
         }finally{
          setLoader(false)
         }
       }
   
       checkLogin()
     },[dispatch , navigate])
   
     if(loader){
      return <Loader/>
     }

  return (
    <>
    { isLogin  && <Navbar /> } 
     <Suspense fallback={<Loader/>}>
     <Outlet/>
     <RealTimeTaskListner/>
    <ToastContainer/>
     </Suspense>
  
    </>
  )
}

export default App
