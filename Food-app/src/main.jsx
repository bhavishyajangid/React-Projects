
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements , Route, RouterProvider } from 'react-router-dom';
import AllCart from './Components/AllCart.jsx';
import Home from './Components/Home.jsx';
import Signup from './Components/Signup.jsx';
import PaymentInfo from './Components/PaymentInfo.jsx';
import MyOrders from './Components/MyOrders.jsx';
import { handleFormData } from './Components/PaymentInfo.jsx';
import AllDish from './Components/AllDish.jsx';
import AllLists from './Components/AllLists.jsx';
import { Provider } from 'react-redux';
import counterStore from './Store/Index.js';

let router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
    <Route path='' element={<Home/>}/>
    <Route path='/cart' element={<AllCart/>}/>
    <Route path='/payment' element={<PaymentInfo/>} action={handleFormData}/>
    <Route path='/orders' element={<MyOrders/>}/>
    <Route path='/menu' element={<AllDish/>}/>
    {/* <Route path='/signup' element={<Signup/>}/> */}
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <Provider store={counterStore}>
    <RouterProvider router={router} />
    </Provider>
 
)
