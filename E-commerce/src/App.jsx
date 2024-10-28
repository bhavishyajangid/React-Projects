import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import { Footer, Home } from './export'
import { Outlet } from 'react-router-dom'
import { Client } from 'appwrite';
const client = new Client();
client.setProject('67189d9d0027d52bffe8');
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authService from './appwrite/auth'
import { useDispatch } from 'react-redux'
import { login, logout } from './Store/authSlice'
import Loader from './components/Loader'
function App() {
  const [loading, setLoading] = useState(false)
  
const dispatch = useDispatch()
  useEffect(() => {
     authService.getCurrentUser()
     .then((userData) => {
      if(userData){
        dispatch(login(userData))
      }else{
        dispatch(logout())
      }
     }).catch((error) => console.log(error)
     ).finally(() => setLoading(false))
  } , [])
  return !loading ? (<>
    <ToastContainer/>
    <Header/>
    <Outlet/>
    <Footer/>
    </>) :
    <Loader/>
    
  
}

export default App
