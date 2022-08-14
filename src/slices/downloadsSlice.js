import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  queue: [],
  downloaded: [],
  cached: [],
};

export const downloadsSlice = createSlice({
  name: "downloads",
  initialState,
  reducers: {},
});

export const {} = downloadsSlice.actions;
export default downloadsSlice.reducer;
