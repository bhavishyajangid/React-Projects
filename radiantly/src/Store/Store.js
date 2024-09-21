import {configureStore} from '@reduxjs/toolkit'
import DataSlice from './DataSlice'

// making store where all the slice are present
const Store = configureStore({reducer : {
    mydata : DataSlice.reducer
}})


export default Store