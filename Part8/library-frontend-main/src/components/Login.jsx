import { LOGIN } from "../queries";
import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";

const LoginForm = ({setError, setToken}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
   const messages = error.graphQLErrors.map(e => e.message).join('\n')
   console.log(messages)
   setError(messages)
    }
})

useEffect(() => {
if(result.data){
const token = result.data.login.value
setToken(token)
localStorage.setItem('addbooks-user-token',token)
}
}, [result.data])

const handleFormSubmit = async(event) => {
 event.preventDefault()
 login({variables: {username, password}})
 setUsername("")
 setPassword("")
}
return (<>
<div>
    <form onSubmit={handleFormSubmit}>
        <div>
        <label>
       username <input type="text" value={username} onChange={({target})=> setUsername(target.value)}/>
        </label>
        </div>
        <div>
        <label>
        password<input type="password" value={password} onChange={({target})=> setPassword(target.value)} />
        </label>
        </div>
        <button type="submit">login</button>
    </form>
</div>
</>)
}

export default LoginForm