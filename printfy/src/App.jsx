import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Main from './components/Main'
import Features from './components/Features'
import Products from './components/Products'
import AllCards from './components/allCards'
import MakeMoney from './components/MakeMoney'
import Footer from './components/Footer'
import ConnectStore from './components/ConnectStore'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Main/>
      <Features/>
      <Products/>
      <ConnectStore/>
      <AllCards/>
      <MakeMoney/>
      <Footer/>
    </>
  )
}

export default App
