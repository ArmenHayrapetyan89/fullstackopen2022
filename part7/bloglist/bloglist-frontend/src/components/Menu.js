import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { logoutUser } from "../reducers/userReducer";
import {
  initializeUsers,
  setUsersToInitialState,
} from "../reducers/usersReducer";
import BlogForm from "./BlogForm";
import Users from "./Users";
import User from "./User";

const Menu = (props) => {
  const padding = {
    padding: 5,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  const logoutChange = () => {
    dispatch(logoutUser(null));
    window.localStorage.removeItem("loggedBlogUser");
    dispatch(setUsersToInitialState());
  };

  const users = useSelector((state) => state.users);

  const user = useSelector((state) => state.user.user);

  return (
    <div>
      <Router>
        <div>
          <Link style={padding} to="/">
            blogs
          </Link>
          <Link style={padding} to="/users">
            users
          </Link>
          <div>
            <div>{user ? user.username : ""} logged in</div>

            <button type="submit" onClick={logoutChange}>
              logout
            </button>
          </div>
          <Routes>
            <Route
              path="/"
              element={
                <BlogForm
                  cssClass={props.cssClass}
                  setCssClass={props.setCssClass}
                />
              }
            />
            <Route path="/users" element={<Users users={users} />} />
            <Route path="/users/:id" element={<User users={users} />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default Menu;
