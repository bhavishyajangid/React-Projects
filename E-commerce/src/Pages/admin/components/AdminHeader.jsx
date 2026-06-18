import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../../../appwrite/auth";
import { logout } from "../../../Store/authSlice";
import logo from "../../../assets/Logo.png";

const AdminHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/");
    });
  };

  return (
    <header className="flex items-center justify-between px-[4%] py-3 bg-white border-b border-gray-200">
      <div className="flex flex-col items-start select-none">
        <img 
          src={logo} 
          alt="FOREVER Logo" 
          className="w-28 md:w-32 h-auto cursor-pointer"
          onClick={() => navigate("/")} 
        />
        <span className="text-[10px] tracking-widest font-semibold text-[#c57d90] uppercase mt-0.5 ml-0.5">
          Admin Panel
        </span>
      </div>
      <button
        onClick={handleLogout}
        className="bg-[#3b3d44] hover:bg-black text-white px-6 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 shadow-sm"
      >
        Logout
      </button>
    </header>
  );
};

export default AdminHeader;
