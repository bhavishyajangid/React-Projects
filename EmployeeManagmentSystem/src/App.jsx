
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import authServices from './Appwrite/Auth.js';
import { HomeSkeleton } from './export.js';
import { login } from './Store/authSlice.js';
import { fetchTask } from './Store/thunks/taskThunk.js';
import { showError } from './utlity/Error&Sucess.js';
import { ToastContainer } from 'react-toastify';



function App() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loader , setLoader]  = useState(true)


     useEffect(() => {
       const checkLogin = async () => {
         try {
          const userData  = await authServices.getCurrentUser()
          if(userData){
            await dispatch(fetchTask(userData)).unwrap()
            dispatch(login(userData))
              userData.admin ? navigate("/admin" , {replace : true}) :  navigate
              ("/employee" , {replace : true})
            }else{
              navigate("/login")
            }
         } catch (error) {
          console.log(error);
           showError(error)
            navigate("/login", { replace: true }); 
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
