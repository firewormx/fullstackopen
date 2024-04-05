const LoginForm = (props)=> {

    const hideWhenVisible = {display: props.loginVisible ? 'none' : ''}
    const showWhenVisible = {display: props.loginVisible ? ''  : 'none'}

return (
    <div>
    <div style ={hideWhenVisible}>
        <button type="submit" onClick= {props.onLoginButton}>login</button>
    </div>
    <div style={showWhenVisible}>
<form onSubmit={props.onLogin}>
        <h2>Login</h2>
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
     <div><button type="submit" onClick={props.onLogin}>login</button></div> 
    </form>  
    <button type="submit" onClick ={props.onCancelButton}>cancel</button> 
    </div>  
    </div>
)
     }


     export default LoginForm