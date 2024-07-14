import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Router , RouterProvider } from 'react-router-dom'
import Features from './components/Features/Features.jsx'
import Men from './components/Men/Men.jsx'
import Women from './components/women/Women.jsx'
import Kids from './components/Kids/Kids.jsx'
import Sale from './components/Sale/Sale.jsx'
import Custmise from './components/Custmise/Custmise.jsx'
import Other from './components/Other/Other.jsx'
import Favorite from './components/Favorite/Favorite.jsx'
import Bag from './components/Bag/Bag.jsx'
import Layout from './Layout.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path = "/" element = {<Layout/>}>
       <Route path='' element = {<App/>} />
       <Route path='/features' element = {<Features/>} />
       <Route path='/men' element = {<Men/>} />
       <Route path='/Women' element = {<Women/>} />
       <Route path='/kids' element = {<Kids/>} />
       <Route path='/sale' element = {<Sale/>} />
       <Route path='/custmise' element = {<Custmise/>} />
       <Route path='/other' element = {<Other/>} />
       <Route path='/other/:id' element = {<Other/>} />
       <Route path='/favorite' element = {<Favorite/>} />
       <Route path='/bag' element = {<Bag/>} />
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>,
)
