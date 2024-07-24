import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AllItemsContextProvider from './Context/AllListsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AllItemsContextProvider>
    <App />
    </AllItemsContextProvider>
  </React.StrictMode>,
)
