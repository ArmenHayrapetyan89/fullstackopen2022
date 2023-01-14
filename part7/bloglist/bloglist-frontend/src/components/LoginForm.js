import Notification from "./Notification";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setUsername, setPassword } from "../reducers/loginReducer";
import { setNotification } from "../reducers/notificationReducer";
import { setUserCredentials } from "../reducers/userReducer";
import { Button, Form } from "react-bootstrap";

const LoginForm = (props) => {
  const dispatch = useDispatch();

  const username = useSelector((state) => state.login.username);
  const password = useSelector((state) => state.login.password);

  const handleLogin = async (event, username, password) => {
    event.preventDefault();

    try {
      dispatch(setUserCredentials({ username, password }));
      dispatch(setUsername(""));
      dispatch(setPassword(""));
    } catch (error) {
      props.setCssClass("error");
      dispatch(setNotification("Wrong username or password", 5));
    }
  };

  const usernameForLogin = async (event) => {
    event.preventDefault();
    const username = event.target.value;
    dispatch(setUsername(username));
  };

  const passwordForLogin = async (event) => {
    event.preventDefault();
    const password = event.target.value;
    dispatch(setPassword(password));
  };

  return (
    <div>
      <h2>log in to application</h2>
      <Notification cssClass={props.cssClass} message={props.errorMessage} />
      <Form onSubmit={(event) => handleLogin(event, username, password)}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            style={{ width: "20%" }}
            type="text"
            value={username}
            name="Username"
            onChange={usernameForLogin}
            id="username"
          />
          <Form.Label>password</Form.Label>
          <Form.Control
            style={{ width: "20%" }}
            type="password"
            value={password}
            name="Password"
            onChange={passwordForLogin}
            id="password"
          />

          <Button id="login-button" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

LoginForm.defaultProps = {
  props: PropTypes.func.isRequired,
};

export default LoginForm;
