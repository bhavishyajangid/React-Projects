import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import { Footer, Home } from './export'
import { Outlet } from 'react-router-dom'
import { Client } from 'appwrite';
const client = new Client();
client.setProject('67189d9d0027d52bffe8');
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default App
