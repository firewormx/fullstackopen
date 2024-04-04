// import { useState, useEffect } from 'react'
// import Blog from './components/Blog'
// import blogService from './services/blogs'

// const App = () => {
//   const [blogs, setBlogs] = useState([])

//   useEffect(() => {
//     blogService.getAll().then(blogs =>
//       setBlogs( blogs )
//     )  
//   }, [])

//   return (
//     <div>
//       <h2>blogs</h2>
//       {blogs.map(blog =>
//         <Blog key={blog.id} blog={blog} />
//       )}
//     </div>
//   )
// }

// export default App

import { useState, useEffect } from 'react'
import Blog from './components/Blog'
// import Notification from './components/Notifications'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
  try{
    const user = await loginService.login({username, password})
  
    window.localStorage.setItem(
      'loggedNoteappUser', JSON.stringify(user)
    ) 
  
   blogService.setToken(user.token)
  
    setUser(user)
    setUsername('')
    setPassword('')
  }catch(exception){
  setErrorMessage('invalid credentials')
  setTimeout(()=>{
  setErrorMessage(null)
  }, 5000)
  }
  }

// const loginForm = () =>{
//   <form onSubmit = {handleLogin}>
//   <div>
//     <h2>Log in to application</h2>
//   <div>
//     username
//     <input type ='text' value={username} name ="username" onChange = {({target}) => setUsername(target.value)}/>
//   </div>
//   <div>
//     password
//     <input  type ='text' value={password} name="password" onChange = {({target}) => setPassword(target.value)}/>
//   </div>
//   </div>  
//   <button type="submit">login</button>
//   </form>
// }

if(user === null){
return (
  <form onSubmit = {handleLogin}>
  <div>
    <h2>Log in to application</h2>
  <div>
    username
    <input type ='text' value={username} name ="username" onChange = {({target}) => setUsername(target.value)}/>
  </div>
  <div>
    password
    <input  type ='text' value={password} name="password" onChange = {({target}) => setPassword(target.value)}/>
  </div>
  </div>  
  <button type="submit">login</button>
  </form>
)
}

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
     
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} />
      )}
      
    </div>
  )
}

export default App