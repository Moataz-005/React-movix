import { createSlice } from "@reduxjs/toolkit";

let Imageconfig = createSlice({
  name: "imageSize",
  initialState: {
    baseUrl: {},
    backdrop:[]
  },
  reducers: {
    configuration: (state, action) => {
        state.baseUrl = action.payload;
    },
    drop:(state , action)=>{
       state.backdrop = action.payload
    }
  },
});

export let { configuration ,drop } = Imageconfig.actions;
export default Imageconfig.reducer;
