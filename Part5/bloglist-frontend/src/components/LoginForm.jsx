import PropTypes from "prop-types";
import Notification from "./Notification";
const LoginForm = (props) => {
  return (
    <div>
      <h2>Login</h2>
      <Notification notification={props.notification} />
      <form onSubmit={props.handleLogin}>
        <div>
          username
          <input
            data-testid="username"
            value={props.username}
            onChange={props.handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            data-testid="password"
            type="password"
            value={props.password}
            onChange={props.handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default LoginForm;
