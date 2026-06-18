import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { Footer, Home } from "./export";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Client } from "appwrite";
const client = new Client();
client.setProject("67189d9d0027d52bffe8");
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "./Store/authSlice";
import Loader from "./components/Loader";
import dataBaseServices from "./appwrite/Database";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminDashboard = location.pathname.startsWith("/admin/dashboard");

  useEffect(() => {
    let isMounted = true;

    async function fetchCurrentUser() {
      try {
        const userData = await authService.getCurrentUser();

        let dbStoreData = {}

        if (userData.email) {
          dbStoreData = await dataBaseServices.getUser(userData.$id);
        }

        if (!isMounted) return;

        console.log("Fetched user data:", dbStoreData);

        if (dbStoreData) {
          dispatch(login(dbStoreData));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.log(error);
        dispatch(logout());
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCurrentUser();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);


  if (loading) {
    return <div className='h-screen w-screen flex justify-center items-center'><Loader /></div>
  }

  return (
    <>
      <ToastContainer />
      {!isAdminDashboard && <Header />}
      <Outlet />
      {!isAdminDashboard && <Footer />}
    </>
  )

}

export default App;
