
import './App.css'
import { useState , useEffect } from 'react';
import {  Navbar} from './export.js'
import { Outlet, useNavigate} from 'react-router'
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import authServices from './Appwrite/Auth.js'
import { Loader } from './export.js';
import { Suspense } from 'react';
import  { login } from './Store/authSlice.js';
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
          if(userData){
              dispatch(login(userData))
              await dispatch(fetchTask(userData)).unwrap()
              userData.admin ? navigate("/admin") :  navigate("/employee")
            }else{
              navigate("/")
            }
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
