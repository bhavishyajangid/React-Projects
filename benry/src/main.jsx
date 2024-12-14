import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/index.js'
import AdminPanel from './pages/AdminPanel.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Profile , Home } from '../exports.js'
import AddUser from './components/AddUser.jsx'
const router = createBrowserRouter(
   createRoutesFromElements(
    <Route path='/' element={<App/>}>
       <Route path='' element={<Home/>}/>
       <Route path='/card/:id' element={<Profile/>}/>
       <Route path='/admin' element={<AdminPanel/>}/>
       <Route path='/adduser' element={<AddUser/>}/>
    </Route>
   )
)
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
)
