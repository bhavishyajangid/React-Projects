import React from 'react'
import Navbar from './components/Navbar'
import Home from './Pages/Home/Home'

const App = () => {
  return (
    <div className='reletive'>

    
    <div className='max-w-md  min-h-screen m-auto overflow-hidden relative'>
      <Navbar/>
     <Home/>
      
    </div>
    </div>
  )
}

export default App