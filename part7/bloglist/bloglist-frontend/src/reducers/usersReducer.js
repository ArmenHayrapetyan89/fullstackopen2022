import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const initialState = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      return [...state].concat(action.payload);
    },
    setUsersToInitialState: () => {
      return initialState;
    },
  },
});

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch(setUsers(users));
  };
};

export const resetUsersToInitialState = () => {
  return async (dispatch) => {
    dispatch(setUsersToInitialState());
  };
};

export default usersSlice.reducer;
export const { setUsers, setUsersToInitialState } = usersSlice.actions;
