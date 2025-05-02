import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import AllCards from "./Components/AllCards";
import { useDispatch } from "react-redux";
import { setData,  } from "./Store/DataSlice";
import Skeleton from "./Components/Skeleton";
import { ToastContainer, toast } from 'react-toastify';
const App = () => {
  const [loader , setLoader] = useState(true)
  const dispatch = useDispatch();
 
  useEffect(() => {
    // fetch the data from api 
    const fetchData = async () => {
      try {
        // Step 1: Get basic list of 150 Pokémon
        const data = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
        const response = await data.json();
    
        // Step 2: Fetch detailed data for each Pokémon
        const completedata = await Promise.all(
          response.results.map(item => fetch(item.url).then(res => res.json()))
        );
    

        dispatch(setData(completedata)); // Store full data in Redux or state
      } catch (err) {
        toast.error("Failed To Load Data")
      }finally{
        setLoader(false)
      }
    };
    

    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      <ToastContainer/>
      {loader ? <Skeleton/> : <AllCards />} 
    </>
  );
};

export default App;
