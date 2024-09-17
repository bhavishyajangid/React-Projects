import React from 'react'
import './App.css'
import Cards from './components/Cards'
import ThemeBtn from './components/ThemeBtn'
import ToggleChangeProvider from './Context/ToggleChange'

function App() {
  return (

    <ToggleChangeProvider >
      <div className="flex flex-wrap min-h-screen items-center">
          <div className="w-full">
              <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
                  <ThemeBtn />
              </div>

              <div className="w-full max-w-sm mx-auto">
                  <Cards/>
              </div>
          </div>
      </div>
      </ToggleChangeProvider>
  )
}

export default App