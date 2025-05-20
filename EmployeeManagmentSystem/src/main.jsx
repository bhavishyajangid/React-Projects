import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route,  RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import { VerifyEmail, AdminDashboard, Home, AddTask, EmployeeDashboard, EditTask, NewTask} from './export.js'
const Signup = lazy(() => import("./pages/Auth/Signup.jsx"))
const Login = lazy(() => import("./pages/Auth/Login.jsx"))
const TaskFullPage = lazy(() => import("./pages/Dashboard/TaskFullPage.jsx"))
const AllEmployee = lazy(() => import("./pages/admin/AllEmployee.jsx"))
const CompletedTask = lazy(() => import('./pages/Task/CompletedTask.jsx'))
import {Provider} from 'react-redux'
import store from './Store/index.js'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<Login/>}  /> 
      {/* <Route path='/home' element={<Home/>}  />  */}
      <Route path='/user' element={<AllEmployee/>}  /> 
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/id/:TaskId' element={<TaskFullPage />}/>
      <Route path='/editTask/:taskId' element={<EditTask/>}/>
      <Route path='/verify-email' element={<VerifyEmail/>}/>
      <Route path='/employee' element={<EmployeeDashboard/>}/>
      <Route path='/admin' element={<AdminDashboard/>} />
      <Route path='/addTask' element={<AddTask/>} />
      <Route path='/completedTask' element={<CompletedTask/>} />
      <Route path='/newTask' element={<NewTask/>} />

    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <RouterProvider router={router}/>
  </Provider>
)
