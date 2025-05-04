import React from 'react';
import { useSelector } from 'react-redux';
import { AllTask, PastTaskInfo } from '../../export';

const EmployeeDashboard = () => {

 const {currentUserDetails} = useSelector(state => state.authSlice)

    return (
        <>
        <PastTaskInfo/>
        <AllTask />
        </>
    );
};

export default EmployeeDashboard;
