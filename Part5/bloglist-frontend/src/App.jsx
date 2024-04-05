import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from "./components/LoginForm"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(['', true])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
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
    setUser(user)
    window.localStorage.setItem(
      'loggedInUser', JSON.stringify(user)
    ) 
    setUsername('')
    setPassword('')
   blogService.setToken(user.token)

    setNotification([`${user.name} logged in successfully!`, true])

    setTimeout(()=> {
      setNotification(["", true])
    },5000)
  }catch(exception){
  setErrorMessage('invalid credentials')
  console.error('Wrong credentials', exception)
  setNotification(['wrong username or password', false])
  setTimeout(()=>{ 
  setNotification(["", true])
  }, 5000)
  }
  }

const handleLogOut = () =>{
 window.localStorage.removeItem('loggedInUser')
 setUser(null)
setNotification(['Successfully logged out', true])
setTimeout(()=> {
 setNotification(["", true])
}, 2000)
}

const addBlog = async (event) => {
  event.preventDefault()
  const newBlog= {
  title,
  author,
  url
  }
  try{
    const returnedBlog = await blogService.create(newBlog)
    setBlogs(blogs.concat(returnedBlog))
    setNotification([`${returnedBlog.title} is added by ${user.name}!`, true])

    setTimeout(()=> {
    setNotification(['', true])
    }, 3000)
  }catch(error){
    setBlogs(blogs.concat(returnedBlog))
    setNotification([`${returnedBlog.title} is added by ${user.name}!`, true])
    setTimeout(()=> {
    setNotification(['', true])
    }, 3000)
  }

    setAuthor('')
    setTitle('')
    setUrl('')
}

const CreateNewForm = () => {
return (
  <div>
  <h2>Create new </h2>
<form onSubmit={addBlog}>
  <div>title:<input type="text" value ={title} name="title" onChange = {({target}) => setTitle(target.value)}/></div>
  <div>author:<input type="text" value ={author} name="author" onChange = {({target}) => setAuthor(target.value)}/></div>
  <div>url: <input  type="text" value ={url} name="url" onChange = {({target}) => setUrl(target.value)}/></div>
  <button type="submit">create</button>
</form>
</div>
)
}
const handleUsernameChange = ({target}) => {
setUsername(target.value)
}

const handlePasswordChange = ({target}) => {
setPassword(target.value)
}

if(user === null) return <LoginForm handleUsernameChange = {handleUsernameChange}
handlePasswordChange = {handlePasswordChange}
username = {username}
password= {password}
handleLogin ={handleLogin}
/>

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification= {notification}/>
      <p>{user.name} logged in</p>       
      <button type="submit" onClick= {handleLogOut}>logout</button>
      <hr></hr>
      <CreateNewForm />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} />
      )}
    </div>
  )
      }
      export default App
      