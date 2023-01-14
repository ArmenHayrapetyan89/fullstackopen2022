import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    userCredentials: (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    },
    setUsersLogout: (state, action) => {
      return {
        ...state,
        user: action.payload,
      };
    },
  },
});

export const setUserCredentials = (credentials) => {
  return async (dispatch) => {
    const loggedUser = await loginService.login(credentials);
    window.localStorage.setItem("loggedBlogUser", JSON.stringify(loggedUser));
    dispatch(userCredentials(loggedUser));
  };
};

export const logoutUser = (logoutUser) => {
  return async (dispatch) => {
    dispatch(setUsersLogout(logoutUser));
  };
};

export const checkUserLoggedIn = () => {
  return async (dispatch) => {
    const loggedUser = window.localStorage.getItem("loggedBlogUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatch(userCredentials(user));
      blogService.setToken(user.token);
    } else {
      dispatch(setUsersLogout(null));
    }
  };
};

export default userSlice.reducer;
const { setUsersLogout, userCredentials } = userSlice.actions;
