import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer";
import notificationReducer from "./reducers/notificationReducer";
import loginReducer from "./reducers/loginReducer";
import userReducer from "./reducers/userReducer";

export const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    blogs: blogReducer,
    login: loginReducer,
    users: userReducer,
  },
});
