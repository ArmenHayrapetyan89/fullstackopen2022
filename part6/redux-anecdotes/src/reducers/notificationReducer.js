import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: null,
  },

  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload;
      return state;
    },
    clearNotification: (state) => {
      state.message = null;
      return state;
    },
  },
});

export default notificationSlice.reducer;
export const { setNotification, clearNotification } = notificationSlice.actions;
