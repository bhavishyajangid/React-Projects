import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import { Home } from './export'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header/>
    <Home/>
    </>
  )
}

export default App
