import { FaCartShopping } from "react-icons/fa6";
import { NavLink, Link } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";

const Navbar = () => {
  const {Quantity} = useSelector(state => state.addToCart)
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  return (
    <div>
      <nav>
        <ul className="w-5/6 h-16 max-sm:w-full max-sm:px-5 m-auto flex justify-between items-center">
        <Link to="/">
          <li className="h-full flex items-center">
            <h1 className="text-orange-600 text-4xl font-semibold capitalize max-sm:text-3xl">
              Tomato.
            </h1>
          </li>
          </Link>
          <li className="h-full flex items-center justify-center gap-6 text-gray-500 capitalize max-lg:hidden">
            <NavLink
              to="/"
              style={({ isActive }) => ({
                color: isActive ? 'red' : 'gray',
              })}
            >
              Home
            </NavLink>
             <NavLink
              to="/menu"
              style={({ isActive }) => ({
                color: isActive ? 'red' : 'gray',
              })}
            >
              Menu
            </NavLink>
            
            
            <NavLink
              to="/orders"
              style={({ isActive }) => ({
                color: isActive ? 'red' : 'gray',
              })}
            >
              My Orders
            </NavLink>
            <NavLink
              to="/none"
              style={({ isActive }) => ({
                color: isActive ? 'red' : 'gray',
              })}
            >
              Contact Us
            </NavLink>
          </li>
          <li className="h-full flex justify-end items-center gap-5">
            <Link to="/cart">
              <FaCartShopping className="text-3xl text-gray-500 mr-2 cursor-pointer max-sm:hidden relative" />
              {
                (Object.keys(Quantity).length === 0) ? null : <span className="w-5 h-5 flex justify-center items-center  top-3 right-[170px] absolute text-sm bg-yellow-300 rounded-full">{Object.keys(Quantity).length}</span>
              }
              
            </Link>
            <CgProfile className="text-3xl text-gray-500 mr-2 cursor-pointer max-sm:hidden" />
            <button
              className="text-3xl text-gray-500 mr-2 cursor-pointer hidden max-sm:block"
              onClick={toggleSidebar}
            >
              <IoMenu />
            </button>
          </li>
        </ul>
      </nav>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default Navbar;
