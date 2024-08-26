import './App.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { DataContext } from './Context/DataContext'
import { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import DataContextProvider from './Context/DataContext'
import Loader from './Components/Loader'

function App() {
  

  return (
    <>
   <DataContextProvider>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </DataContextProvider>
    </>
  )
}

export default App
