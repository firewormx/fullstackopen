import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../reducers/userReducer";
import {Form, Button} from 'react-bootstrap'
import { setNotifications } from "../reducers/notificationReducer";

const LoginForm = () => {
const dispatch = useDispatch()
const navigate = useNavigate()

const handleLogin = (event) => {
event.preventDefault()
const  username = event.target.usernameInput.value;
const  password = event.target.passwordInput.value;

event.target.usernameInput.value = ""
event.target.passwordInput.value = ""

dispatch(login(username, password))
dispatch(setNotifications(`${username} logged in successfully!`, 2))
navigate('/')
}

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>username </Form.Label>
          <Form.Control type="text" id="usernameInput"  name="Username"/>

        <Form.Label>password</Form.Label>
          <Form.Control type="password" id="passwordInput"  name="Password"/>

        <Button variant= "primary" type="submit">login</Button>
        </Form.Group>
      </form>
    </div>
  );
};


export default LoginForm;
