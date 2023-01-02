import Notification from "./Notification";
import PropTypes from "prop-types";

const LoginForm = (props) => {
  return (
    <div>
      <h2>log in to application</h2>
      <Notification cssClass={props.cssClass} message={props.errorMessage} />
      <form onSubmit={props.handleLogin}>
        <div>
          username{" "}
          <input
            type="text"
            value={props.username}
            name="Username"
            onChange={({ target }) => props.setUsername(target.value)}
            id="username"
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={props.password}
            name="Password"
            onChange={({ target }) => props.setPassword(target.value)}
            id="password"
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  );
};

LoginForm.defaultProps = {
  props: PropTypes.func.isRequired,
};

export default LoginForm;
