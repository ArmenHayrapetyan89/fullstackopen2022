import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBlog, likeBlog } from "../reducers/blogReducer";

const Blog = (props) => {
  const [showAllBlogInformation, setShowAllBlogInformation] = useState(false);
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const viewShowHide = {
    display: showAllBlogInformation ? "" : "none",
  };

  const toggleVisibility = () => {
    setShowAllBlogInformation(!showAllBlogInformation);
  };

  const isLoggedUser = () => {
    const loggedUser = JSON.parse(
      window.localStorage.getItem("loggedBlogUser")
    );

    if (loggedUser === null) {
      return false;
    }

    const userExists =
      props.blog.user === undefined || props.blog.user === null
        ? false
        : loggedUser.username === props.blog.user.username;

    console.log("USER EXISTS: ", userExists);
    return userExists;
  };

  const increaseLikes = () => {
    if (isLoggedUser()) {
      dispatch(likeBlog(props.blog));
    }
  };

  const removeBlog = () => {
    if (
      window.confirm(`Removing ${props.blog.title} by ${props.blog.author}`)
    ) {
      dispatch(deleteBlog(props.blog));
    }
  };

  return (
    <div>
      <div style={blogStyle} key={props.blog.id}>
        <div className="title-author">
          {props.blog.title} {props.blog.author}
          <button className="view-hide-button" onClick={toggleVisibility}>
            {showAllBlogInformation ? "hide" : "view"}
          </button>
        </div>
        <div className="full-blog" style={viewShowHide}>
          <p>{props.blog.url} </p>
          <p>
            likes <span className="likesContent">{props.blog.likes}</span>{" "}
            <button
              className="like-button"
              onClick={() => {
                increaseLikes();
              }}
            >
              like
            </button>
          </p>
          <p>
            {props.blog.user === undefined || props.blog.user === null
              ? ""
              : props.blog.user.username}
          </p>
          {isLoggedUser() ? (
            <button className="delete-blog" onClick={() => removeBlog()}>
              remove
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
