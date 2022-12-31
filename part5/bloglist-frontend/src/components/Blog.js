import { useState } from "react";
import blogService from "../services/blogs";

const Blog = (props) => {
  const [showAllBlogInformation, setShowAllBlogInformation] = useState(false);
  const [like, setLike] = useState(props.blog.likes);

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

    return userExists;
  };

  const increaseLikes = () => {
    setLike(like + 1);

    if (isLoggedUser()) {
      const newBlog = { ...props.blog, likes: like + 1 };

      blogService.update(props.blog.id, newBlog);
    }
  };

  const removeBlog = () => {
    const blogToDelete = props.blogs.find(
      (blogObject) => blogObject.id === props.blog.id
    );

    if (
      window.confirm(`Removing ${blogToDelete.title} by ${blogToDelete.author}`)
    ) {
      const newBlogs = props.blogs.filter(
        (blogObject) => blogObject.id !== blogToDelete.id
      );

      props.setBlogs(newBlogs);

      blogService.deleteObject(props.blog.id);
    }
  };

  return (
    <div>
      <div style={blogStyle} key={props.blog.id}>
        <div className="title-author">
          {props.blog.title} {props.blog.author}
          <button onClick={toggleVisibility}>
            {showAllBlogInformation ? "hide" : "view"}
          </button>
        </div>
        <div className="full-blog" style={viewShowHide}>
          <p>{props.blog.url} </p>
          <p>
            likes <span className="likesContent">{like}</span>{" "}
            <button
              onClick={() => {
                increaseLikes();
              }}
            >
              like
            </button>
            {/*isLoggedUser() ? (
              <button
                onClick={() => {
                  increaseLikes();
                }}
              >
                like
              </button>
            ) : (
              ""
            )*/}
          </p>
          <p>
            {props.blog.user === undefined || props.blog.user === null
              ? ""
              : props.blog.user.username}
          </p>
          {isLoggedUser() ? (
            <button onClick={() => removeBlog()}>remove</button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
