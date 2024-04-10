const LoginForm = (props)=> {
return (
    <div>
    <h2>Login</h2>
<form onSubmit={props.onLogin}>
      <div>
        username
          <input
          type="text"
          value={props.username}
          name="Username"
          onChange={props.onUsernameChange}
        />
      </div>
      <div>
        password
          <input
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


     export default LoginForm