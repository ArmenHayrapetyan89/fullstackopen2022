import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: null,
  },

  reducers: {
    notify: (state, action) => {
      state.message = action.payload;
      return state;
    },
    clearNotification: (state) => {
      state.message = null;
      return state;
    },
  },
});

export const setNotification = (content, seconds) => {
  return async (dispatch) => {
    dispatch(notify(content));
    setTimeout(() => {
      dispatch(clearNotification());
    }, seconds * 1000);
  };
};

export default notificationSlice.reducer;
export const { notify, clearNotification } = notificationSlice.actions;
