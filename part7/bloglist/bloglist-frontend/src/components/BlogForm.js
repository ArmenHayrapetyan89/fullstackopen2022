import Notification from "../components/Notification";
import { useState } from "react";
import { setNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";
import { Button, Form } from "react-bootstrap";

const BlogForm = (props) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newComments, setNewComments] = useState([]);
  const [blogVisible, setBlogVisible] = useState(false);

  const hideWhenVisible = {
    display: blogVisible ? "none" : "",
  };
  const showWhenVisible = {
    display: blogVisible ? "" : "none",
  };

  const createNewBlog = async (event) => {
    event.preventDefault();

    if (blogVisible) {
      if (props.user) {
        try {
          props.dispatch(createBlog(newTitle, newAuthor, newUrl, newComments));

          setNewTitle("");
          setNewAuthor("");
          setNewUrl("");
          setNewComments([]);

          props.dispatch(
            setNotification(`a new blog ${newTitle} by ${newAuthor} added`, 5)
          );

          props.setCssClass("success");
        } catch (exception) {
          props.setCssClass("error");
        }
      }
    } else {
      props.dispatch(createBlog(newTitle, newAuthor, newUrl, newComments));
    }
  };

  const formStyle = {
    width: "20%",
  };

  return (
    <div className="form-div">
      <h2>Blogs</h2>

      <Notification cssClass={props.cssClass} />

      <h2>create new</h2>
      <div style={hideWhenVisible}>
        <Button className="create-button" onClick={() => setBlogVisible(true)}>
          create new blog
        </Button>
      </div>
      <div style={showWhenVisible}>
        <Form onSubmit={createNewBlog}>
          <Form.Group>
            <div>
              <Form.Label>title:</Form.Label>
              <Form.Control
                style={formStyle}
                type="text"
                value={newTitle}
                name="Title"
                onChange={({ target }) => setNewTitle(target.value)}
                className="title-field"
              />
            </div>
            <div>
              <Form.Label>author:</Form.Label>
              <Form.Control
                style={formStyle}
                type="text"
                value={newAuthor}
                name="Author"
                onChange={({ target }) => setNewAuthor(target.value)}
                className="author-field"
              />
            </div>
            <div>
              <Form.Label>url:</Form.Label>

              <Form.Control
                style={formStyle}
                type="text"
                value={newUrl}
                name="Url"
                onChange={({ target }) => setNewUrl(target.value)}
                className="url-field"
              />
            </div>
            <Button className="create-blog-button" type="submit">
              create
            </Button>
            <Button onClick={() => setBlogVisible(false)}>cancel</Button>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};

export default BlogForm;
