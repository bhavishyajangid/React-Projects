import React from 'react';
import Navbar from '../Header/Navbar';
import { Outlet } from 'react-router';
import { AdminDashboard, EmployeeTask, Login, PastTaskInfo, Tasks } from '../../export';

const Home = () => {
   

    return (
        <>
        <PastTaskInfo/>
        <EmployeeTask/>
        <AdminDashboard/>
        <Login/>
        </>
    );
};

export default Home;
