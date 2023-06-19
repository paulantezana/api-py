import { createSlice } from "@reduxjs/toolkit";

export const adminLayoutSlice = createSlice({
    name: 'adminLayout',
    initialState: {
      menu: [],
      loading: false,
    },
    reducers: {
      
    },
    extraReducers: () => {

    }
});

export default adminLayoutSlice.reducer