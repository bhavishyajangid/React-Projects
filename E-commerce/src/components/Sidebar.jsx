import React from 'react';
import { NavLink } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";

const Sidebar = ({navItem , isOpen , toggleSidebar}) => {
    
    return (
            <div className={` absolute top-0 right-0  h-full w-48 bg-white shadow-lg transform transition-transform duration-300   ${isOpen ? '-translate-x-0 block' : 'translate-x-48  hidden'}`}>
                <nav className="p-4">
                    <div className='w-full flex justify-start items-center'>
                    <button className="text-2xl cursor-pointer  text-end" onClick={toggleSidebar}><RxCross2  /></button>
                    </div>
                    <ul className="flex flex-col gap-4 mt-5">
                        {navItem.map((item) => (
                            <li className='text-sm w-full '  key={item.name}>
                                <NavLink 
                                    to={item.path} 
                                    className={({ isActive }) => `text-gray-600 ${isActive ? 'font-bold' : ''}`}
                                >
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

    );
};

export default Sidebar;
