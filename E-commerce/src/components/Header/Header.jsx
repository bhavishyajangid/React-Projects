import React, { useState } from "react";
import logo from "../../assets/Logo.png";
import { FaUser } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { FaBagShopping } from "react-icons/fa6";
import { NavLink, Link } from "react-router-dom";
import { HeaderBtn , Sidebar , Logo } from "../../export";
import { HiOutlineMenu } from "react-icons/hi";
import authService from "../../appwrite/auth";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/authSlice";
const Header = () => {
  const {status} = useSelector(state => state.authSlice)
  const dispatch = useDispatch()
  // const [visible, setvisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
};

const handleLogout = () => {
  authService.logout().then(() => {
    dispatch(logout())
})
}
  const navItem = [
    {
      name: "HOME",
      path: "/",
      active : true
    },
    {
      name: "COLLECTION",
      path: "/collection",
      active : true
    },
    {
      name: "ABOUT",
      path: "/about",
      active : true
    },
    {
      name: "CONTACT",
      path: "/contact",
      active : true
    },
    {
        name : 'ADMIN PANEL' , 
        path : '/admin',
        active : status
    }
  ];

 
  return (
    <nav className="w-4/5 h-20 m-auto flex items-center justify-between max-w-[1500px] max-lg:w-11/12 ">
      <div className="w-36 h-9 max-sm:w-32 shrink-0 max-sm:h-8">
       <Logo/>
      </div>
      <ul className="flex gap-6 font-medium items-center max-md:hidden min-w-60 ">
        {navItem.map((item) => (
            item.active  && 
          <li>
            <NavLink to={item.path}>
              <span className="text-sm text-gray-600">{item.name}</span>
                <hr
                  className={`w-3/4 h-[1.5px] m-auto bg-gray-700 hidden`}
                />
            </NavLink>
          </li>
        ))}
      </ul>

      <ul className="flex items-center gap-3 max-sm:gap-2">
        {status ? (
          
          <li className="flex gap-5 text-xl items-center ">
            <HeaderBtn className="max-sm:hidden" />
            <FiSearch className="cursor-pointer" />
            <FaUser className="cursor-pointer" />
            <span className="relative"><FaBagShopping/> <span className="absolute top-2 left-2 font-medium cursor-pointer bg-cyan-200 text-center rounded-full inline-block w-4 h-4 text-xs">0</span></span>
            
          </li>
        ) : (
            <li className="flex gap-4 max-sm:gap-2 ">
            <HeaderBtn path="/login" text="Log In"  />
            <HeaderBtn path="/signup" text="Sign up"  />
            <button onClick={handleLogout}>logout</button>
          </li>
        )}
        <li>
        <HiOutlineMenu className="max-md:block text-2xl cursor-pointer hidden" onClick={toggleSidebar}/>
          <Sidebar navItem={navItem} toggleSidebar={toggleSidebar} isOpen={isOpen}/>
        </li>
      </ul>
      
    </nav>
  );
};

export default Header;
