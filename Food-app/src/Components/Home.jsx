import React from 'react'
import MiddlePage from './MiddlePage'
import AllLists from './AllLists'
import AllDish from './AllDish'
import AppName from './AppName'
import Signup from './Signup'
import Login from './Login'

const Home = () => {
  return (
    <>
    <div className='reletive'>
    <MiddlePage/>
    <AllLists/>
    <AllDish/>
    <AppName/>
    {/* <Signup/> */}
    {/* <Login/>/ */}
    </div>
    </>
  )
}

export default Home