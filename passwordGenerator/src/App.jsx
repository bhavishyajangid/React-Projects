import { useState, useCallback , useEffect , useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook 
  const passwordRef = useRef()

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFDGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxys';
    if (numberAllowed === true) str += "0123456789"
    if (charAllowed === true) str += "~!@#$%^&*()?";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed])


  useEffect(() =>{
passwordGenerator()
  } , [length , numberAllowed , charAllowed , passwordGenerator])

   // making copy function 
  const copyToClipBoard = useCallback(()=>{
    navigator.clipboard.writeText(password)
    alert("Password Copy To Clipboard")
  }, [password])

  return (
    <>
      <div className="main-container">
        <div className="input">
          <input 
          type="text" 
          value={password} 
          name="text" id="input" 
          readOnly
          ref={passwordRef}
           />
          
          <button
          onClick={copyToClipBoard}
          >Copy</button>
        </div>
        <div className="other">
          <input
           type="range"
           name="range"
           id="range"
           min={6}
           max={50} 
           value={length} 
           onChange={(e) => { setLength(e.target.value) }} />

          <label>lenght : {length}</label>

          <input 
          type="checkbox" 
          name="none" 
          id="checkbox"
          defaultChecked  = {setNumberAllowed}
          onChange={()=> {setNumberAllowed((prev) => !prev)}}
            />

          <label htmlFor="">Number</label>

          <input 
          type="checkbox" 
          name="none" 
          id="checkbox2"
          defaultChecked  = {charAllowed}
          onChange={()=> {setCharAllowed((prev) => !prev)}}
           />

          <label htmlFor="">Charter</label>

        </div>
      </div>

    </>
  )
}

export default App
