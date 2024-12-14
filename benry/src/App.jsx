import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Home, Navbar, ProfileList } from "../exports";
import Loader from "./components/Loader";
import { setAllProfile, setOption } from "./store/profileList";
import { Outlet } from "react-router-dom";
const App = () => {
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();

  // fetch all profile form the dummyjson api 
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("https://dummyjson.com/users");
        const response = await res.json();
        if (response) {
          dispatch(setAllProfile(response.users));  // save this profile in the store
          dispatch(setOption(response.users))
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div>
          <Navbar />
          <Outlet />
        </div>
      )}
    </>
  );
};

export default App;
