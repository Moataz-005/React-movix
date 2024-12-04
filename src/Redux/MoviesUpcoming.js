import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Token } from "../Utils/Utils";

const headers = {
  Authorization: Token,
};

export  let posters = createAsyncThunk("UpcomingMovies/getposter", async () => {
  let { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular`,{ headers: headers});
  console.log(data)
  return data;
});

const Upcoming = createSlice({
  name: "UpcomingMovies",
  initialState: {
    dataUp: [],
  },

  reducers: {
    configuration: (state) => {},
  },

  extraReducers: function (bulider) {
    // fullfiled , success  , pending
    bulider.addCase(posters.fulfilled , (state , action)=>{
                // state.allData = action.payload
                console.log('data will success')
                state.dataUp =action.payload
                // console.log(state.dataUp)
            })
  },
});

export default Upcoming.reducer;
