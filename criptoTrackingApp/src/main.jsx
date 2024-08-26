import React, { createElement, StrictMode } from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Main from './Components/Main.jsx';
import Result from './Components/Result.jsx';
import './index.css'
import DataContextProvider from './Context/DataContext.jsx'
import { createBrowserRouter, createRoutesFromElements , Route, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter(
   
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Main/>}/>
      <Route path='/result/:coinId'  element={<Result/>}/>
    </Route>
  )
    
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>  
      <RouterProvider router={router} />
  </React.StrictMode>,
)
