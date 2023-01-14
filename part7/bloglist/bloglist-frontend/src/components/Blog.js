import { useParams } from "react-router-dom";
import { commentBlog, likeBlog } from "../reducers/blogReducer";
import { useState } from "react";

import { Button } from "react-bootstrap";

const Blog = (props) => {
  const id = useParams().id;
  const [commentValue, setCommentValue] = useState("");

  if (!props.blogs || props.blogs === 0) {
    return <div>Loading...</div>;
  }

  const blog = props.blogs.find((blog) => blog.id === id);

  if (!blog) {
    return <div>Loading...</div>;
  }

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
      <Button className="like-button" onClick={increaseLikes}>
        like
      </Button>
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
          <Button type="submit">add comment</Button>
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
};

export default Blog;
