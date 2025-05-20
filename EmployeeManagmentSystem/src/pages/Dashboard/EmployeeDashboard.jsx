import React from 'react';
import { useSelector } from 'react-redux';
import {  PastTaskInfo , AllTask } from '../../export';

const EmployeeDashboard = () => {

 const {currentUserDetails} = useSelector(state => state.authSlice)
 const {acceptedTask , allTask} = useSelector(state => state.taskSlice)
    return (
        <>
        <PastTaskInfo/>
        <AllTask tasks={allTask} />
        </>
    );
};

export default EmployeeDashboard;
