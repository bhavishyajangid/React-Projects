import { useEffect, useState } from 'react'
import './App.css'
import { Loader, Navbar} from './export.js'
import { Outlet, useLocation} from 'react-router'
import { ToastContainer } from "react-toastify";
import { useDispatch } from 'react-redux';
import authServices from './Appwrite/Auth.js';
import { login } from './Store/authSlice.js';

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
          dispatch(login(loginUser))
          setIsAuth(true)
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
