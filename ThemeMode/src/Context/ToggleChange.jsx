import { createContext } from "react";
import { useState , useEffect } from "react";


export const ToggleChange = createContext({
    ThemeMode : "light" ,
    DarkMode : () => {} ,
    LightMode : () => {} ,
})



const  ToggleChangeProvider = ({children}) =>{
    const [ThemeMode , setThemeMode] = useState("light")
    
    const DarkMode = () =>{
        setThemeMode("dark")
      }
    
      const LightMode = () =>{
        setThemeMode("light")
      }

      useEffect(() => {
        document.querySelector('html').classList.remove("light", "dark")
        document.querySelector('html').classList.add(ThemeMode)
      }, [ThemeMode])

    return <ToggleChange.Provider value={{ThemeMode , DarkMode , LightMode}}>{children}</ToggleChange.Provider>
}

export default ToggleChangeProvider