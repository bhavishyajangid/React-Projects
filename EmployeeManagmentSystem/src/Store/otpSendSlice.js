import { createSlice } from "@reduxjs/toolkit";


const otpSendSlice =createSlice({
    name : "otp",
    initialState : {
        otpSend : false,
        generatedOtp : null,
        resend : false,
        loader : false,
        userEmailVerify : false,
        isEmailExist : false ,
        formDetails : {}
    },
    reducers : {
        setOtpSend : (state , action) => {
             state.otpSend = action.payload.otp
             state.formDetails = action.payload.user
        },
        setGeneratedOtp : (state , action) => {
            state.generatedOtp = action.payload
        },
        setResend : (state , action) => {
            state.resend = action.payload
            state.generatedOtp = null;
        },
        setLoader : (state , action) => {
            state.loader = action.payload
        },
        setUserEmailVerify : (state , action) => {
            state.userEmailVerify = action.payload
        },
        resetState : (state) => {
            state.userEmailVerify = false;
            state.generatedOtp = null;
            state.loader = false;
            state.otpSend = false
        },
        

    }
})

export const {setOtpSend,setGeneratedOtp, setResend,setLoader,setUserEmailVerify , resetState} = otpSendSlice.actions

export default otpSendSlice