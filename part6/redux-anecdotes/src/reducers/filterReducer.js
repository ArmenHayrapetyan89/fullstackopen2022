import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filter: "",
  },
  reducers: {
    filterAnecdote(state, action) {
      state.filter = action.payload;
      return state;
    },
  },
});

export default filterSlice.reducer;
export const { filterAnecdote } = filterSlice.actions;
