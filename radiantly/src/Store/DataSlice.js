import { createSlice } from "@reduxjs/toolkit";

// making slice for store
const DataSlice = createSlice({
  name: "mydata",
  initialState: {
    data: [],
    allData: [],
    filter : 'filter'
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
      state.allData = action.payload;
    },
    searchData: (state, action) => {
      state.allData = action.payload ? 
        state.data.filter((item) => item.name.toLowerCase().includes(action.payload.toLowerCase()))
        : state.data;

        // reset the filter
        state.filter = "filter"
    },
    filterData: (state, action) => {
        state.filter = action.payload
        state.allData = action.payload == "filter" ? 
        state.allData = state.data : 
        state.allData = state.data.filter((pokemon) =>
            pokemon.types.some((typeObj) => typeObj.type.name === action.payload)
          );
    },
  },
});

export const { setData, searchData, filterData } =
  DataSlice.actions;
export default DataSlice;
