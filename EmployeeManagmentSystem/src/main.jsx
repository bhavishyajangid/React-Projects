import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route,  RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import {Login , Navbar, Signup , VerifyEmail, EmployeeDashboard, AdminDashboard, Home, SetNewTask} from './export.js'
import {Provider} from 'react-redux'
import store from './Store/index.js'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Home/>}  /> 
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/verify-email' element={<VerifyEmail/>}/>
      <Route path='/admin' element={<AdminDashboard/>} />
      <Route path='/newtask' element={<SetNewTask/>} />
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <RouterProvider router={router}/>
  </Provider>
)
