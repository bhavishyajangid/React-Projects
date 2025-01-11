import React, { useState } from 'react';
import { Link } from 'react-router';
import Button from './Button';
const Sidebar = ({isOpen , toggleSidebar , navbarOpiton}) => {
 

  

  return (
    <div>
      {/* Button to open the sidebar */}
      

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-white transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => {toggleSidebar()}}
          className="absolute top-4 right-4 text-white text-3xl"
        >
          &times;
        </button>

        {/* Sidebar Content */}
        <div className="flex flex-col gap-5 p-6 py-10 font-medium">
          {
            navbarOpiton.map((item) => (
                
              <Link to={item.link}>
                {
                  item.isVisible &&  <Button key={item.tittle} type={item.type} btn={item.tittle} logout={item.logout} />
                  
                }
               
              </Link>
            ))

        }
            
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
