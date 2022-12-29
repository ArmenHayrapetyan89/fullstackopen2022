import Blog from "./Blog";
import blogService from "../services/blogs";
import Notification from "../components/Notification";

const BlogForm = (props) => {
  const hideWhenVisible = { display: props.blogVisible ? "none" : "" };
  const showWhenVisible = { display: props.blogVisible ? "" : "none" };

  const logoutChange = () => {
    window.localStorage.removeItem("loggedBlogUser");
    props.setUser(null);
  };

  const createNewBlog = async (event) => {
    if (props.blogVisible) {
      event.preventDefault();

      const newBlogObject = {
        title: props.newTitle,
        author: props.newAuthor,
        url: props.newUrl,
      };

      try {
        const newBlog = await blogService.create(newBlogObject);
        props.setBlogs(props.blogs.concat(newBlog));

        props.setNewTitle("");
        props.setNewAuthor("");
        props.setNewUrl("");

        props.setErrorMessage(
          `a new blog ${props.newTitle} by ${props.newAuthor} added`
        );
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
  };

  return (
    <div>
      <h2>Blogs</h2>
      <Notification cssClass={props.cssClass} message={props.errorMessage} />
      <div>{props.user.username} logged in</div>
      <h2>create new</h2>
      <div style={hideWhenVisible}>
        <button onClick={() => props.setBlogVisible(true)}>
          create new blog
        </button>
      </div>
      <div style={showWhenVisible}>
        <form onSubmit={createNewBlog}>
          <div>
            title:
            <input
              type="text"
              value={props.newTitle}
              name="Title"
              onChange={({ target }) => props.setNewTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              type="text"
              value={props.newAuthor}
              name="Author"
              onChange={({ target }) => props.setNewAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              type="text"
              value={props.newUrl}
              name="Url"
              onChange={({ target }) => props.setNewUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
          <button onClick={() => props.setBlogVisible(false)}>cancel</button>
        </form>
      </div>

      {props.blogs
        .sort((firstLike, secondLike) => secondLike.likes - firstLike.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            showAllBlogInformation={props.showAllBlogInformation}
            setShowAllBlogInformation={props.setShowAllBlogInformation}
            blogs={props.blogs}
            setBlogs={props.setBlogs}
          />
        ))}

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
