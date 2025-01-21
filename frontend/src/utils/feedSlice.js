import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    removeFeed: (state, action) => {
      const newArr = state.filter((res) => res._id !== action.payload);
      return newArr;
    },
    removeAllFeed: (state, action) => {
      return [];
    },
  },
});
export const { addFeed, removeFeed, removeAllFeed } = feedSlice.actions;
export default feedSlice.reducer;
