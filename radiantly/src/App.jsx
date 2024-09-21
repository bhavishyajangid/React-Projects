import React, { useEffect } from "react";
import Navbar from "./Components/Navbar";
import AllCards from "./Components/AllCards";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Components/Loading";
import { setData, setLoading } from "./Store/DataSlice";

const App = () => {
  const { loading } = useSelector((state) => state.mydata); // retrive loading state from store
  const dispatch = useDispatch();

  useEffect(() => {
    // fetch the data from api 
    const fetchData = async () => {
      dispatch(setLoading());
      try {
        let data = await fetch("https://dummyapi.online/api/pokemon");// there are no images found in your api only url is given so i use this api 
        let response = await data.json();
        dispatch(setData(response)); // dispatch the fetched data to store
      } catch (err) {
        throw new Error(err);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      {loading ? <Loading /> : <AllCards />} // conditoinal statement
    </>
  );
};

export default App;
