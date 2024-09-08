
import './App.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { Outlet } from 'react-router-dom';
import AllListContextProvider from './Components/Context/AllListContext';

function App() {



  return (
    <>
      <AllListContextProvider>
        <Navbar />
        <Outlet />
        <Footer />
      </AllListContextProvider>
    </>
  )
}

export default App
