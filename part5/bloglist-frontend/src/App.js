import { useState, useEffect } from "react";

import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [cssClass, setCssClass] = useState("");
  const [blogVisible, setBlogVisible] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong username or password");
      setCssClass("error");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const addBlog = () => {};

  const handleBlogChange = () => {};

  return (
    <div>
      {user === null && (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          cssClass={cssClass}
          setCssClass={setCssClass}
        />
      )}

      {user !== null && (
        <BlogForm
          blogs={blogs}
          setBlogs={setBlogs}
          newBlog={newBlog}
          setNewBlog={setNewBlog}
          addBlog={addBlog}
          handleBlogChange={handleBlogChange}
          user={user}
          setUser={setUser}
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          newAuthor={newAuthor}
          setNewAuthor={setNewAuthor}
          newUrl={newUrl}
          setNewUrl={setNewUrl}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          cssClass={cssClass}
          setCssClass={setCssClass}
          blogVisible={blogVisible}
          setBlogVisible={setBlogVisible}
        />
      )}
    </div>
  );
};

export default App;
