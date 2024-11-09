import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux';
import authService from '../appwrite/auth';
import { logout } from '../Store/authSlice';
const Sidebar = ({navItem , isOpen , toggleSidebar}) => {
const navigate = useNavigate()
const dispatch = useDispatch()
const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout())
      navigate('/')
      
  })
  }
     const {userData} = useSelector(state => state.authSlice)
    return (
            <div className={` absolute top-0 right-0  h-full w-48 bg-white shadow-lg transform transition-transform duration-300    ${isOpen ? '-translate-x-0 block' : 'translate-x-48  hidden'}`}>
                <nav className="p-4">
                    <div className='w-full flex justify-start items-center'>
                    <button className="text-2xl cursor-pointer  text-end" onClick={toggleSidebar}><RxCross2  /></button>
                    </div>
                    {
                        userData && 
                        <div className="flex flex-col items-center mt-10">
                        <h2 className="text-xl font-semibold">{ userData.name }</h2>
                        <p className="text-sm text-gray-400">{userData.email}</p>
                      </div>
                    }
       

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
                        <button className='text-sm capitalize text-gray-600 text-left' onClick={handleLogout}>LOGOUT</button>
                    </ul>
                </nav>
            </div>

    );
};

export default Sidebar;
