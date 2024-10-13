
import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { Login, Logout } from './store/authSlice'

function App() {
  const [loading , setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
     authService.getCurrentUser()
     .then((response) => {
      if(response){
        dispatch(Login({userData : response}))
        console.log(response , 'response'); 
      }else{
        dispatch(Logout())
      }
     })
     .catch((response) => {console.log(response);
     })
     .finally(() => setLoading(false))
  } , [])
  
  return  !loading ? (
    <div>this is home page</div>
  ) : <p>loading....</p>
}

export default App
