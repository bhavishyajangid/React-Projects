
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import authServices from './Appwrite/Auth.js';
import { HomeSkeleton } from './export.js';
import { login } from './Store/authSlice.js';
import { showError } from './utlity/Error&Sucess.js';



function App() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loader , setLoader]  = useState(true)


     useEffect(() => {
       const checkLogin = async () => {
         try {
          const userData  = await authServices.getCurrentUser()
          if(userData){
            dispatch(login(userData))
            }
         } catch (error) {
           showError(error)
         }finally{
          setLoader(false)
         }
       }
   
       checkLogin()
     },[dispatch , navigate ])


     if(loader){
       return <HomeSkeleton/>
     }

 
  return (
    <>
    <ToastContainer />
     <Outlet/>
    </>
  )
}

export default App
