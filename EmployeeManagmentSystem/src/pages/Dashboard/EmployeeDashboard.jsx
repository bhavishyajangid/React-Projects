import React from 'react';
import Navbar from '../Header/Navbar';
import { Outlet } from 'react-router';
import { AdminDashboard, EmployeeTask, Login, PastTaskInfo, Tasks } from '../../export';
import { useSelector } from 'react-redux';

const EmployeeDashboard = () => {



    return (
        <>
        <PastTaskInfo/>
        <EmployeeTask/>
        </>
    );
};

export default EmployeeDashboard;
