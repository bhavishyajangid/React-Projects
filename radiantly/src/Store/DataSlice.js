import { createSlice } from "@reduxjs/toolkit";


// making slice for store 
const DataSlice = createSlice({
    name : 'mydata' , 
    initialState : {
        data : [] , 
        loading : false , 
        searchData : []
    },
    reducers : {
        setData : (state , action) =>{
       state.data = action.payload
       state.loading = false
       state.searchData = action.payload
        },
        setLoading : (state) => {
       state.loading  = true
        },
       searchData : (state , action) =>{
           state.searchData = action.payload ? state.data.filter((item) => item.pokemon.toLowerCase().includes(action.payload.toLowerCase())):
           state.data
        }   
    }
})

export const {setData , setLoading , searchData} = DataSlice.actions
export default DataSlice