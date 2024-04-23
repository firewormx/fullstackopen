import PropTypes from 'prop-types'

const LoginForm = (props) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={props.onLogin}>
        <div>
        username
          <input
            data-testid = 'username'
            type="text"
            value={props.username}
            name="Username"
            onChange={props.onUsernameChange}
          />
        </div>
        <div>
        password
          <input
            data-testid ='password'
            type="password"
            value={props.password}
            name="Password"
            onChange={props.onPasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onUsernameChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}


export default LoginForm