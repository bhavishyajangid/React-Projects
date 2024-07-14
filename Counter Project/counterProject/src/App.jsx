
import { useState } from 'react'
import './App.css'

function App() {
 let [counter , setCounter] = useState(0)
  let addValue = () =>{
    if(counter < 20){
      setCounter(++counter)
      console.log(counter); 
  }
  }

  let removeValue = () =>{
    if(counter > 0){
      setCounter(--counter)

    }
  }

  return (
    <>
    <h1>chai or react</h1>
    <p>counter value :{counter}</p>

    <button onClick={addValue}>add value</button>
    <br />
    <button onClick={removeValue} >remove value</button>
    </>
  )
}

export default App
