import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { data } from "react-router";
import authServices from "../Appwrite/Auth";
import dataBaseServices, { databaseServices } from "../Appwrite/Database";

export const handleOtp = createAsyncThunk(
    'otpsend',
    async(data , {rejectWithValue}) => {
        try {
           let otp = await authServices.sendOtp(data)
           
           return otp ? otp : null
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const handleEmailExist = createAsyncThunk(
    'verify',
    async(email , {rejectWithValue}) => {
        try {
            const verify = await dataBaseServices.emailIsExists(email)
            return verify
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)


const otpSendSlice =createSlice({
    name : "otp",
    initialState : {
        otpSend : false,
        generatedOtp : null,
        loader : false,
        userEmailVerify : false,
        isEmailExist : false ,
        formDetails : {}
    },
    reducers : {
        setOtpSend : (state , action) => {
            console.log('setotp' , action.payload);
            
             state.otpSend = action.payload.otp
             state.formDetails = action.payload.user
        },
        setGeneratedOtp : (state , action) => {
            state.generatedOtp = action.payload
        },
        setResend : (state) => {
            state.otpSend = true     
        },
        setLoader : (state , action) => {
            state.loader = action.payload
        },
        setUserEmailVerify : (state , action) => {
            state.userEmailVerify = action.payload
        },
        resetState : (state) => {
            state.otpSend =  false,
        state.generatedOtp = null,
        state.loader = false,
        state.userEmailVerify = false,
        state.isEmailExist = false ,
        state.formDetails = {}
        },
    

    },

    extraReducers : (builder) => {
        builder
        .addCase(handleOtp.pending, (state) => {
                state.loader = true
              })
              .addCase(handleOtp.fulfilled, (state, action) => {
                  state.loader = false
                  state.generatedOtp = action.payload
                  state.otpSend = false
                  console.log(action.payload);
                  
              })
              .addCase(handleOtp.rejected, (state, action) => {
                state.loader = false
              })  

            .addCase(handleEmailExist.pending, (state) => {
                state.loader = true
              })
              .addCase(handleEmailExist.fulfilled, (state, action) => {
                  state.loader = false
              })
              .addCase(handleEmailExist.rejected, (state, action) => {
                state.loader = false
              })


    }
})

export const {setOtpSend,setGeneratedOtp, setResend,setLoader,setUserEmailVerify , resetState} = otpSendSlice.actions

export default otpSendSlice