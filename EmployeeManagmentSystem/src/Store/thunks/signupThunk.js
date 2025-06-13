import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { Reject } from "twilio/lib/twiml/VoiceResponse";

export const handleSendOtp = createAsyncThunk(
   "auth/user",

   async(data , {isRejectedWithValue}) => {
       console.log(data);
       
   }
)