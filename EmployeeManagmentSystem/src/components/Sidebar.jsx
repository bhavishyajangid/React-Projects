import { current } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaCalendarAlt,
  FaMoneyBill,
  FaCog,
  FaTimes,
  FaTasks,
} from 'react-icons/fa';
import { Link } from 'react-router';


const sidebarOptions = [
   { id: 1, label: 'Dashboard', icon: <FaTachometerAlt />, link : "/admin" },
  { id: 2, label: 'Employees', icon: <FaUsers /> , link : "/user" },
  { id: 3, label: 'Departments', icon: <FaBuilding /> , link : "" },
  { id: 4, label: 'Tasks', icon: <FaTasks />  , link : '/task'},
  { id: 5, label: 'Leaves', icon: <FaCalendarAlt /> , link : "" },
  { id: 6, label: 'Salary', icon: <FaMoneyBill /> , link : "" },
  { id: 7, label: 'Setting', icon: <FaCog />, link : "" },
];

const Sidebar = ({ isOpen, onClose }) => {
  const [activeOption , setActiveOption] = useState(1)

  const handleSelect = (id) => {
    setActiveOption(id);
  };
  return (
    <>
      <div
        className={`fixed md:static top-0 right-0 h-screen w-64 bg-gray-900 text-white z-40 shadow-lg transform 
        ${isOpen ? 'translate-x-0' : 'translate-x-full'} 
        transition-transform duration-300 ease-in-out md:translate-x-0`}
      >
        {/* Mobile Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700 md:hidden">
          <span className="text-lg font-semibold tracking-wide">Menu</span>
          <button onClick={() => {onClose()}}>
            <FaTimes className="text-2xl" />
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:block px-6 py-4 border-b border-gray-700 text-lg font-semibold tracking-wide">Menu</div>

        {/* Sidebar Options */}
        <div className="px-4 md:px-6 py-2 md:py-4 space-y-3 w-full flex flex-col">
          {sidebarOptions.map((item, index) => (
            <Link to={item.link} key={index}>
            <div
              onClick={() => {handleSelect(item.id)}}
              className={`px-4 py-2 rounded cursor-pointer flex items-center gap-3 font-medium transition-all w-full
                ${activeOption === item.id ? 'bg-gray-800 text-white shadow-inner' : 'hover:bg-gray-700 text-gray-300'}`}
            >
              {item.icon} {item.label}
            </div>
            </Link> 
          ))}
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          onClick={() => {onClose()}}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;
