
import './App.css'
import { useState , useEffect } from 'react';
import {  CardSkeleton, Navbar} from './export.js'
import { Outlet, useNavigate} from 'react-router'
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import authServices from './Appwrite/Auth.js'
import dataBaseServices from './Appwrite/Database.js'
import { Loader } from './export.js';
import { Suspense , lazy } from 'react';
import authSlice, { login } from './Store/authSlice.js';


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
             navigate("/home")
           }else{
             navigate('/')
           }
         } catch (error) {
           console.log(error)
         }finally{
          setLoader(false)
         }
       }
   
       checkLogin()
     },[dispatch])
   
     if(loader){
      return <CardSkeleton/>
     }

  return (
    <>
    { isLogin  && <Navbar /> } 
     <Suspense fallback={<Loader/>}>
     <Outlet/>
    <ToastContainer/>
     </Suspense>
  
    </>
  )
}

export default App
