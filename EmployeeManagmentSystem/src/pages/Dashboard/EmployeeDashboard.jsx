import React from 'react';
import { useSelector } from 'react-redux';
import {  PastTaskInfo , AllTask } from '../../export';

const EmployeeDashboard = () => {

 const {currentUserDetails} = useSelector(state => state.authSlice)
 const {allTask} = useSelector(state => state.taskSlice)
 console.log(allTask , 'alltask');
 
    return (
        <>
        <PastTaskInfo/>
        <AllTask tasks={allTask} />
        </>
    );
};

export default EmployeeDashboard;
