import { createSlice } from "@reduxjs/toolkit";


const profileListSlice = createSlice({
    name : 'profile' , 
    initialState : {
        allProfile : [],
       loader : false,
       allOption : []
    }, 
    reducers : {
        setAllProfile : (state , action) => {
           state.allProfile = action.payload
        },
      setLoader : (state , action)=> {
        state.loader = action.payload
      },

      setOption : (state , action) => {
        state.allOption = action.payload
      }
       
    }
})

export const {setAllProfile , setLoader , setOption} = profileListSlice.actions
export default profileListSlice