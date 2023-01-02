import Blog from "./Blog";
import blogService from "../services/blogs";
import Notification from "../components/Notification";
import { useState } from "react";

const BlogForm = (props) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [blogVisible, setBlogVisible] = useState(false);

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
      const newBlogObject = {
        title: newTitle,
        author: newAuthor,
        url: newUrl,
      };

      if (props.user) {
        try {
          const newBlog = await blogService.create(newBlogObject);
          props.setBlogs(props.blogs.concat(newBlog));

          setNewTitle("");
          setNewAuthor("");
          setNewUrl("");

          props.setErrorMessage(`a new blog ${newTitle} by ${newAuthor} added`);
          props.setCssClass("success");
          setTimeout(() => {
            props.setErrorMessage(null);
          }, 5000);
        } catch (exception) {
          props.setCssClass("error");
          setTimeout(() => {
            props.setErrorMessage(null);
          }, 5000);
        }
      }
    } else {
      props.createBlog({ title: newTitle, author: newAuthor, url: newUrl });
    }
  };

  return (
    <div className="formDiv">
      <h2>Blogs</h2>
      <Notification cssClass={props.cssClass} message={props.errorMessage} />
      <div>{props.user ? props.user.username : ""} logged in</div>
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

      {props.blogs
        ? props.blogs
            .sort((firstLike, secondLike) => secondLike.likes - firstLike.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                showAllBlogInformation={props.showAllBlogInformation}
                setShowAllBlogInformation={props.setShowAllBlogInformation}
                blogs={props.blogs}
                setBlogs={props.setBlogs}
                className="blog"
              />
            ))
        : ""}
      <button
        type="submit"
        onClick={() => {
          logoutChange();
        }}
      >
        logout
      </button>
    </div>
  );
};

export default BlogForm;
