import { DataContext } from "../Context/DataContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chart from "react-google-charts";
import Loader from "./Loader";

const Result = () => {
  const { coinId } = useParams();
  const { currencyInfo } = useContext(DataContext);
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const [data, setData] = useState([["Date", "Prices"]]);


  // fetching data by coinId and set this value into coindata state 
  let fetchCoinData = async () => {
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((response) => response.json())
      .then((response) => setCoinData(response))
      .catch((err) => console.error(err));
  };

  // fetch the data for making price chart
  let fetchHistoricalData = async () => {
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currencyInfo}&days=10&interval=daily`,
      options
    )
      .then((response) => response.json())
      .then((response) => setHistoricalData(response));
  };

  // call the function when the currencyinfo value changed
  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currencyInfo]);


  // heres we make datacopy for making chat we want date or prices for making a chart of prices so we date and price in the datacopy varible 
  useEffect(() => {
    let makingChart = async () => {
      let dataCopy = [["Date", "Prices"]];
      if (historicalData.prices) {
        historicalData.prices.map((item) => {
          dataCopy.push([
            `${new Date(item[0]).toLocaleDateString().slice(0, -5)}`,
            item[1],
          ]);
        });

        setData(dataCopy);// set the datacopy value in the data state
      }
    };
    makingChart();
  }, [historicalData]);

  if (coinData) {
    return (
      <>
        <div className="p-5">
          <div className=" w-full flex justify-between items-center flex-col mt-5">
            <img className="w-16 h-16" src={coinData.image.small} alt="" />
            <h1 className="text-2xl text-center text-white mt-2">
              {coinData.symbol.toUpperCase()}
            </h1>
          </div>
          <div className="max-w-[500px] m-auto flex justify-center items-center mt-6 ">

            {/* by using react-google-chart we make the chart  */}
            <Chart
              chartType="LineChart"
              data={data} // pass this data state to the data option 
              height="100%"
              width="100%"
              legendToggle
            />
          </div>

          <ul className="max-w-[500px] h-56 mt-10 m-auto ">
            <li className="w-full h-9 border-gray-600 border-b text-sm text-white flex justify-between items-center p-4">
              <span>Crypto Market Rank</span>
              <span>{coinData.market_cap_rank}</span>
            </li>
            <li className="w-full h-7 border-gray-600 border-b text-sm text-white flex justify-between items-center p-4">
              <span>Current Price</span>
              <span>
                <span>{currencyInfo === "usd" ? "$" : "₹"}</span>{" "}
                {coinData.market_data.current_price[currencyInfo]}
              </span>
            </li>{" "}
            <li className="w-full h-7 border-gray-600 border-b text-sm text-white flex justify-between items-center p-4">
              <span>Market Cap</span>
              <span>{coinData.market_data.market_cap[currencyInfo]}</span>
            </li>{" "}
            <li className="w-full h-7 border-gray-600 border-b text-sm text-white flex justify-between items-center p-4">
              <span>High 24h</span>
              <span>{coinData.market_data.high_24h[currencyInfo]}</span>
            </li>{" "}
            <li className="w-full h-7 border-gray-600 border-b text-sm text-white flex justify-between items-center p-4">
              <span>Low 24h</span>
              <span>{coinData.market_data.low_24h[currencyInfo]}</span>
            </li>
          </ul>
        </div>
      </>
    );
  } else {
    return <Loader />;
  }
};

export default Result;
