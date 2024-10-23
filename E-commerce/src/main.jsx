
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route,  RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './Store/index.js'
import { CardInfo, Home } from './export.js'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route path='' element={<Home/>} /> 
      <Route path='/product/:id' element={<CardInfo/>} /> 
      <Route path='/collection' /> 
      <Route path='/about' /> 
      <Route path='/contact' /> 
      <Route path='/' /> 
    </Route>
  )
)
createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
   
)
