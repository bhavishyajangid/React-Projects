import { useState } from 'react'
import './App.css'

function App() {
  const [colour, setColour] = useState("aqua")


  return (
    <>
    <div className="w-full h-screen"
    style={{backgroundColor : colour}}
    >
     <div className="w-3/4 h-fit bg-white rounded-xl flex justify-evenly items-center absolute bottom-4 left-40 flex-wrap py-2 px-2">
      <button className='bg-blue-800 h-10 w-20 font-medium rounded-lg capitalize size-14 '
      onClick={ () => {setColour("blue")}}
      >blue</button>
      <button className='bg-white h-10 w-20 font-medium rounded-lg capitalize size-14 '
      onClick={ () => {setColour("white")}}
      >white</button>
      <button className='bg-red-600 h-10 w-20 font-medium rounded-lg capitalize size-14 '
      onClick={ () => {setColour("red")}}
      >red</button>
      <button className='bg-green-700 h-10 w-20 font-medium rounded-lg capitalize size-14 '
      onClick={ () => {setColour("green")}}>green</button>
      <button className='bg-violet-800 h-10 w-20 font-medium rounded-lg capitalize size-14 '
      onClick={ () => {setColour("violet")}}>violet</button>
      <button className='bg-purple-600 h-10 w-20 font-medium rounded-lg capitalize size-14 '
      onClick={ () => {setColour("purple")}}>purple</button>
      <button className='bg-pink-600 h-10 w-20 font-medium rounded-lg capitalize size-14 '
      onClick={ () => {setColour("pink")}}>pink</button>
      <button className='bg-gray-700 h-10 w-20 font-medium rounded-lg capitalize size-14 '
      onClick={ () => {setColour("gray")}}>gray</button>
      <button className='bg-yellow-500 h-10 w-20 font-medium rounded-lg capitalize size-14 '
      onClick={ () => {setColour("yellow")}}>yellow</button>
      <button className='bg-orange-600 h-10 w-20 font-medium rounded-lg capitalize size-14 '
      onClick={ () => {setColour("orange")}}
      >orange</button>
     </div>
     </div>
    </>
  )
}

export default App
