import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`absolute top-17 left-0 h-full bg-gray-500 text-white w-64 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <button
        className="absolute top-4 right-4 text-3xl text-white"
        onClick={toggleSidebar}
      >
        <RxCross2 />
      </button>
      <nav className="mt-16">
        <NavLink
          to="/"
          className="block px-4 py-2 text-lg hover:bg-gray-700"
          onClick={toggleSidebar}
        >
          Home
        </NavLink>
        <NavLink
          to="/menu"
          className="block px-4 py-2 text-lg hover:bg-gray-700"
          onClick={toggleSidebar}
        >
          Menu
        </NavLink>
        <NavLink
          to="/cart"
          className="block px-4 py-2 text-lg hover:bg-gray-700"
          onClick={toggleSidebar}
        >
          Cart
        </NavLink>
        <NavLink
          to="/orders"
          className="block px-4 py-2 text-lg hover:bg-gray-700"
          onClick={toggleSidebar}
        >
          My Orders
        </NavLink>
        <NavLink
          to="/none"
          className="block px-4 py-2 text-lg hover:bg-gray-700"
          onClick={toggleSidebar}
        >
          Contact Us
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
