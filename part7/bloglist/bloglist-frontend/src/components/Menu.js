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
import Blogs from "./Blogs";
import { initializeBlogPosts } from "../reducers/blogReducer";
import Blog from "./Blog";

const Menu = (props) => {
  const padding = {
    padding: 5,
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeBlogPosts());
  }, [dispatch]);

  const logoutChange = () => {
    dispatch(logoutUser(null));
    window.localStorage.removeItem("loggedBlogUser");
    dispatch(setUsersToInitialState());
  };

  const users = useSelector((state) => state.users);

  const user = useSelector((state) => state.user.user);

  const blogs = useSelector((state) => state.blogs);

  console.log("BLOGS: ", blogs);
  console.log("USER: ", user);
  console.log("USERS: ", users);

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
                <div>
                  <BlogForm
                    cssClass={props.cssClass}
                    setCssClass={props.setCssClass}
                    dispatch={dispatch}
                    user={user}
                  />
                  <Blogs blogstyle={blogStyle} blogs={blogs} />
                </div>
              }
            />
            <Route
              path="/"
              element={<Blogs blogstyle={blogStyle} blogs={blogs} />}
            />

            <Route path="/users" element={<Users users={users} />} />
            <Route path="/users/:id" element={<User users={users} />} />

            <Route
              path="/blogs/:id"
              element={<Blog user={user} blogs={blogs} dispatch={dispatch} />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default Menu;
