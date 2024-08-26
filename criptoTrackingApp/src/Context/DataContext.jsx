import { createContext, useEffect, useState } from "react";
import Loader from "../Components/Loader";

export const DataContext = createContext({
  allData: [],
  inputValue: "",
  currencyInfo: "usd",
  loaderActive: false,
  setInputValue: () => {},
  setCurrencyInfo: () => {},
});

const DataContextProvider = ({ children }) => {
  // heres we make all the state 
  const [allData, setAllData] = useState([]);
  const [inputValue, setInputValue] = useState();
  const [currencyInfo, setCurrencyInfo] = useState("usd");
  const [loaderActive, setLoaderActive] = useState(false);
 
  // fetching data and set this data into alldata state
  useEffect(() => {
    const fetchData = async () => {
      //set loader value to false
      setLoaderActive(true);

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-NLw3gAsGNSy76iaD8aTnwyBj",
        },
      };

      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currencyInfo}` , options,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-cg-demo-api-key": "CG-NLw3gAsGNSy76iaD8aTnwyBj",
          },
        }
      );

      const data = await response.json();
      // store fetching data into alldata state
      setAllData(data);
      // again its change the value of loaderactive state for making loading 
      setLoaderActive(false);
    };

    fetchData();
  }, [currencyInfo]);

  return (
    <DataContext.Provider
      value={{
        allData,
        inputValue,
        setInputValue,
        setCurrencyInfo,
        currencyInfo,
        loaderActive,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
