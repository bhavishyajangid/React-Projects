
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route,  RouterProvider } from 'react-router-dom'
import { Provider, useSelector } from 'react-redux'
import store from './Store/index.js'
import { CardInfo, Home, Signup , Login, Card, Allcart } from './export.js'


// const fetchCartItem = async() => {
//   try {
//     const response = await dataBaseService.getCarts(userData.$id); // Assuming userId is passed as a parameter
//     return response.documents; // Return the cart items
//   } catch (error) {
//     console.error('Failed to fetch cart items:', error);
//     throw new Response('Failed to fetch cart items', { status: 500 }); // Handle errors appropriately
//   }

// }


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route path='' element={<Home/>} /> 
      <Route path='/product/:id' element={<CardInfo/>} /> 
      <Route path='/collection' /> 
      <Route path='/about' /> 
      <Route path='/contact' /> 
      <Route path='/cart' element={<Allcart/>} /> 
      <Route path='/login' element={<Login/>} /> 
      <Route path='/signup' element={<Signup/>} /> 
    </Route>
  )
)
createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
   
)
