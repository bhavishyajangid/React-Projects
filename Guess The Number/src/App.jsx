import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [remGuess, setRemGuess] = useState(10)
  const [inputValue, setInputValue] = useState('')
  const [number, setNumber] = useState(null)
  const [result, setResult] = useState('')
  const [dead, setDead] = useState(false)
  const [prevGuess, setPrevGuess] = useState([])
  const takingResult = () => {
    
    if (isNaN(inputValue) || inputValue.trim() === "") {
     alert("Please enter a valid number.");
     return;
   }
   const inputNumber = parseInt(inputValue)
    if (inputNumber == number) {
      setResult('Your Guess Is Correct')
      setDead(true)
    setPrevGuess([...prevGuess, inputNumber]);
    setRemGuess((remGuess > 0) ? remGuess - 1 : setDead(true) ? undefined : alert("try again "))


    } else if (inputNumber < number) {
      setResult('The Number Is Smaller')
    setPrevGuess([...prevGuess, inputNumber]);
    setRemGuess((remGuess > 0) ? remGuess - 1 : setDead(true) ? undefined : alert("try again "))

    } else if (inputNumber > number) {
      setResult('The Number Is Largest')
    setPrevGuess([...prevGuess, inputNumber]);
    setRemGuess((remGuess > 0) ? remGuess - 1 : setDead(true) ? undefined : alert("try again "))

    } else if(typeof(inputValue) == "string"){
             alert("please enter a number")
    }
  }


  useEffect(() => {
    let randomNumber = Math.floor(Math.random() * 100)
    setNumber(randomNumber)
  }, [])





  return (
    <>
      <h1 className='text-center text-5xl font-semibold text-white  '>Guess the number game </h1>
      <p className='mt-5'>Try And Guess The Number Between 1 To 100</p>
      <p>You Have 10 Attempts To Guess The Right Number</p>
      <div className='absolute top-[40%] left-[50%] -translate-x-[50%]'>
        <h1 className='text-3xl'>Guess The Number</h1>
        <input className='h-8 w-56 border-none outline-none rounded-xl mt-5 bg-gray-700' type="text" name="name" id="input" value={inputValue} onChange={(e) => (dead === false) ? setInputValue(e.target.value) : setInputValue(inputValue)} />
        <br />
        <button className='w-48 h-10 rounded-lg bg-purple-700 text-white text-lg font-medium mt-7 '  onClick={takingResult}
          disabled={dead}>submit Guess</button>
        <p className='mt-5'>Preview Guesses :
          {prevGuess.map((guess, index) => (
            <span>{guess} , </span>
          ))}</p>
        <p>Remaining Guesses : <span>{remGuess}</span></p>
        <p>{result}</p>


      </div>
    </>
  )
}

export default App
