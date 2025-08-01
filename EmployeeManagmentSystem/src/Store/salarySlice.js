import { createSlice } from "@reduxjs/toolkit";
import { setAllLeave } from "./leaveSlice";

const salarySlice = createSlice({
    name : 'salary',
    initialState : {
        storedSalary : {},
        allSalary : [],
        loader : true,
        prevEmpId : '',
        firstRender : true
    },

    reducers : {
         setStoredSalary : (state , action) => {
            const {empId , salary} = action.payload
            state.storedSalary[empId] = salary
            state.allSalary = salary
            state.loader = false
            state.prevEmpId = empId
            state.firstRender = false
            console.log('stored all the salary' , empId , salary);
            
         },
         setAllSalary : (state , action) => {
            const {empId , salary} = action.payload
             state.allSalary = salary
             state.loader = false
             state.prevEmpId = empId
         },
         setSalaryLoader : (state , action) => {
            state.loader = action.payload
         },
         addRealTimeSalary : (state , action) => {
             const {empId , payload} = action.payload

             if(state.storedSalary[empId]){
                 state.storedSalary[empId].push(payload)
             }else{
                state.storedSalary[empId] = [payload]
             }

             const currentViewedEmpId = state.prevEmpId; // you store this in your slice
console.log(empId , state.prevEmpId);

      if (empId === currentViewedEmpId) {
        state.allSalary.push(payload);
      }
         },
         
    }
})

export const {addRealTimeSalary , setStoredSalary , setAllSalary , setSalaryLoader} = salarySlice.actions
export default salarySlice