import Blog from "./Blog";
import Notification from "../components/Notification";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

import { createBlog, initializeBlogPosts } from "../reducers/blogReducer";

const BlogForm = (props) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [blogVisible, setBlogVisible] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogPosts());
  }, [dispatch]);

  const blogs = useSelector((state) => state.blogs);

  const hideWhenVisible = {
    display: blogVisible ? "none" : "",
  };
  const showWhenVisible = {
    display: blogVisible ? "" : "none",
  };

  const logoutChange = () => {
    window.localStorage.removeItem("loggedBlogUser");
    props.setUser(null);
  };

  const createNewBlog = async (event) => {
    event.preventDefault();

    if (blogVisible) {
      if (props.user) {
        try {
          dispatch(createBlog(newTitle, newAuthor, newUrl));

          setNewTitle("");
          setNewAuthor("");
          setNewUrl("");

          dispatch(
            setNotification(`a new blog ${newTitle} by ${newAuthor} added`, 5)
          );

          props.setCssClass("success");
        } catch (exception) {
          props.setCssClass("error");
        }
      }
    } else {
      dispatch(createBlog(newTitle, newAuthor, newUrl));
    }
  };

  const sortedBlogs = () => {
    return [...blogs].sort(
      (firstLike, secondLike) => secondLike.likes - firstLike.likes
    );
  };

  return (
    <div className="formDiv">
      <h2>Blogs</h2>
      <Notification cssClass={props.cssClass} />
      <div>{props.user ? props.user.username : ""} logged in</div>
      <button
        type="submit"
        onClick={() => {
          logoutChange();
        }}
      >
        logout
      </button>
      <h2>create new</h2>
      <div style={hideWhenVisible}>
        <button className="create-button" onClick={() => setBlogVisible(true)}>
          create new blog
        </button>
      </div>
      <div style={showWhenVisible}>
        <form onSubmit={createNewBlog}>
          <div>
            title:
            <input
              type="text"
              value={newTitle}
              name="Title"
              onChange={({ target }) => setNewTitle(target.value)}
              className="title-field"
            />
          </div>
          <div>
            author:
            <input
              type="text"
              value={newAuthor}
              name="Author"
              onChange={({ target }) => setNewAuthor(target.value)}
              className="author-field"
            />
          </div>
          <div>
            url:
            <input
              type="text"
              value={newUrl}
              name="Url"
              onChange={({ target }) => setNewUrl(target.value)}
              className="url-field"
            />
          </div>
          <button className="create-blog-button" type="submit">
            create
          </button>
          <button onClick={() => setBlogVisible(false)}>cancel</button>
        </form>
      </div>

      {sortedBlogs().length !== 0
        ? sortedBlogs().map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              showAllBlogInformation={props.showAllBlogInformation}
              setShowAllBlogInformation={props.setShowAllBlogInformation}
              className="blog"
            />
          ))
        : ""}
    </div>
  );
};

export default BlogForm;
