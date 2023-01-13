//import { useState } from "react";
//import { deleteBlog, likeBlog } from "../reducers/blogReducer";
//import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { commentBlog, likeBlog } from "../reducers/blogReducer";
import { useState } from "react";

const Blog = (props) => {
  const id = useParams().id;
  const [commentValue, setCommentValue] = useState("");

  if (!props.blogs || props.blogs === 0) {
    return <div>Loading...</div>;
  }

  const blog = props.blogs.find((blog) => blog.id === id);

  console.log("BLOG: ", blog);

  if (!blog) {
    return <div>Loading...</div>;
  }

  //const [showAllBlogInformation, setShowAllBlogInformation] = useState(false);

  //const loggedUser = useSelector((state) => state.user.user);

  /*const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };*/

  /*const viewShowHide = {
    display: showAllBlogInformation ? "" : "none",
  };*/

  /*const toggleVisibility = () => {
    setShowAllBlogInformation(!showAllBlogInformation);
  };*/

  /*



  const removeBlog = () => {
    if (
      window.confirm(`Removing ${props.blog.title} by ${props.blog.author}`)
    ) {
      dispatch(deleteBlog(props.blog));
    }
  };*/

  const isLoggedUser = () => {
    if (props.user === null) {
      return false;
    }

    const userExists =
      blog.user === undefined || blog.user === null
        ? false
        : props.user.username === blog.user.username;

    console.log("USER EXISTS: ", userExists);
    return userExists;
  };

  const increaseLikes = () => {
    if (isLoggedUser()) {
      props.dispatch(likeBlog(blog));
    }
  };

  const handleCommentChange = (event) => {
    setCommentValue(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    props.dispatch(commentBlog(blog, commentValue));
    setCommentValue("");
  };

  return (
    <div>
      <h1>blog app</h1>
      <h2>{blog.title}</h2>
      <p>
        <a href="https://de.wikipedia.org/wiki/Saxophon">{blog.url}</a>
      </p>
      <span className="likes-content">{blog.likes}</span> likes
      <button className="like-button" onClick={increaseLikes}>
        like
      </button>
      <p>Added by {blog.user.name}</p>
      <h3>Comments</h3>
      <div>
        <form onSubmit={handleCommentSubmit}>
          <input
            type="text"
            value={commentValue}
            name="Comments"
            onChange={handleCommentChange}
            className="url-field"
          />{" "}
          <button type="submit">add comment</button>
        </form>
      </div>
      <div>
        <ul>
          {blog.comments.map((comment, index) => {
            return <li key={index}>{comment}</li>;
          })}
        </ul>
      </div>
    </div>
  );
  /*return (
    <div>
      <div style={blogStyle} key={props.blog.id}>
        <div className="title-author">
          {props.blog.title} {props.blog.author}
          {
            <button className="view-hide-button" onClick={toggleVisibility}>
              {showAllBlogInformation ? "hide" : "view"}
            </button>
          }
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
  );*/
};

export default Blog;
