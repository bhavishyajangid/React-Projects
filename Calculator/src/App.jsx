import { useState } from "react";
import "./App.css";
import Buttons from "./components/Buttons/Buttons";

function App() {
 

  let [inputValue, setInputValue] = useState("");
  let [history , setHistory]  = useState([])
  let [lastElement , setLastElement] = useState()

  // ckeck which button is click or perform all the calculation
  const btnClick = (buttonText) => {
    // if Ac button is clicked
    if (buttonText === 'Ac') {
      setInputValue("")
    } else if(buttonText === '=') {
      // make history of all the calculation
      setHistory([...history , inputValue])
      setLastElement(history.length )
      
        // perform calculation
        let result = eval(inputValue)
        // if calculation result set the inputValue is empty else result
        if(result == "0"){
          setInputValue('')
        }else{
          setInputValue(result)
        }

        // if C button is clicked
    }else if(buttonText === "C"){
         
    }

    // if History Button is clicked
    else if(buttonText === "H"){
      if(lastElement >= 0){
       // display the history of calculation
        setInputValue(history[lastElement])
        setLastElement(--lastElement)
      }
    }
    else{
      if(buttonText === "÷" ){
        buttonText = '/'
      }else if(buttonText === "x"){
        buttonText = '*'
      }

      // set value of the calulation into inpuValue
      setInputValue(
        (prevInputValue) => prevInputValue + buttonText
      );
    }
  };

  return (
    <>
      <div className="min-h-96 w-72 bg-black rounded-xl p-2 flex flex-col items-center ">
        <input
          type="text"
          name="text"
          id="none"
          placeholder="0"
          value={inputValue}
          readOnly
          className="w-full h-16 px-5 border-none outline-none text-4xl text-right font-medium bg-black text-white placeholder:text-white"
        />
       
         <Buttons btnClick={btnClick}/>
        
      </div>
    </>
  );
}

export default App;
