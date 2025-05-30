
import './App.css'
import { useState , useEffect } from 'react';
import {  AdminDashboardSkeleton, CardSkeleton, ChatBox, Home, Login, Navbar} from './export.js'
import { Outlet, useNavigate} from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import authServices from './Appwrite/Auth.js'
import { Loader } from './export.js';
import { Suspense } from 'react';
import  { login } from './Store/authSlice.js';
import RealTimeTaskListner from './components/RealTimeTaskListner.jsx';
import { fetchTask } from './Store/thunks/taskThunk.js';
import { FaLeaf } from 'react-icons/fa';
import { showError } from './utlity/Error&Sucess.js';



function App() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const{isLogin} = useSelector(state => state.authSlice)
    const { loaderForSkeleton} = useSelector(state => state.taskSlice)
    const [loader , setLoader]  = useState(true)


     useEffect(() => {
       const checkLogin = async () => {
         try {
          const userData  = await authServices.getCurrentUser()
          if(userData){
              dispatch(login(userData))
              userData.admin ? navigate("/admin" , {replace : true}) :  navigate
              ("/employee" , {replace : true})
              await dispatch(fetchTask(userData)).unwrap()
            }else{
              navigate("/login")
            }
         } catch (error) {
          console.log(error);
           showError(error)
           navigate("/")
         }finally{
          setLoader(false)
         }
       }
   
       checkLogin()
     },[dispatch ])


     if(loader && !isLogin){
       return <Loader/>
     }

      if(isLogin && loaderForSkeleton){
      return <AdminDashboardSkeleton/>
     }

    
    

  return (
    <>
    <Outlet/>
    </>
  )
}

export default App
