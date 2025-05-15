import React from 'react'
import Navbar from './components/Navbar'
import Home from './Pages/Home/Home'
import Referall from './Pages/referall/Referall'

const App = () => {
  return (
    <div className='reletive'>

    
    <div className='max-w-md  min-h-screen m-auto overflow-hidden relative'>
      <Navbar/>
      <Referall/>
     <Home/>
     
      
    </div>
    </div>
  )
}

export default App