
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route,  RouterProvider } from 'react-router-dom'
import { Provider, useSelector } from 'react-redux'
import store from './Store/index.js'
import { CardInfo, Home, Signup , Login,  Allcart, OrderInfo, Collection, About, Contactus, AllOrders} from './export.js'




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route path='' element={<Home/>} /> 
      <Route path='/product/:id' element={<CardInfo/>} /> 
      <Route path='/collection' element={<Collection/>} /> 
      <Route path='/about'  element={<About/>}/> 
      <Route path='/contact' element={<Contactus/>} /> 
      <Route path='/cart' element={<Allcart/>} /> 
      <Route path='/login' element={<Login/>} /> 
      <Route path='/signup' element={<Signup/>} /> 
      <Route path='/order' element={<AllOrders/>} /> 
      <Route path='/orderinfo' element={<OrderInfo/>} /> 
    </Route>
  )
)
createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
   
)
