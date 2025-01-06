import { useEffect, useState } from 'react'
import './App.css'
import { Loader, Navbar} from './export.js'
import { Outlet, useLocation} from 'react-router'
import { ToastContainer } from "react-toastify";
import { useDispatch } from 'react-redux';
import authServices from './Appwrite/Auth.js';
import { login } from './Store/authSlice.js';
import dataBaseServices from './Appwrite/Database.js';

function App() {
  const dispatch = useDispatch()
  const [loader ,setLoader] = useState(true)
  const location = useLocation()

  const noNavbarRoutes = ["/login" ,"/signup"]

  useEffect(() => {
    const checkLogin = async () => {
      try {
       const loginUser  = await authServices.getCurrentUser()
        if(loginUser){
           const userDetails = await dataBaseServices.getUserDetails(loginUser.$id)
           if(userDetails){
             dispatch(login(userDetails))
           }
        }
       
      } catch (error) {
        console.log(error)
      } finally{
        setLoader(false)
      }
    }

    checkLogin()
  },[])

  if(loader){
     return <Loader/>
  }
  return (
    <>

     {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
     <Outlet/>
    <ToastContainer/>
    </>
  )
}

export default App
