import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    username: "",
    password: "",
  },
  reducers: {
    usernames: (state, action) => {
      return { ...state, username: action.payload };
    },
    passwords: (state, action) => {
      return { ...state, password: action.payload };
    },
  },
});

export const setUsername = (username) => {
  return async (dispatch) => {
    dispatch(usernames(username));
  };
};

export const setPassword = (password) => {
  return async (dispatch) => {
    dispatch(passwords(password));
  };
};

export default loginSlice.reducer;
const { usernames, passwords } = loginSlice.actions;
