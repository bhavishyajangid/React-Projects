import { useState } from 'react'
import './App.css'
import {Home , Navbar} from './export.js'
import { Outlet } from 'react-router'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar/>
     <Outlet/>
    </>
  )
}

export default App
