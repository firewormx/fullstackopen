import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import "./app.css"

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
    window.localStorage.setItem(
      'loggedInUser', JSON.stringify(user)
    ) 
   blogService.setToken(user.token)
    setUser(user)
    setNotification([`${user.name} logged in successfully!`, true])
    setUsername('')
    setPassword('')
    setTimeout(()=> {
      setNotification(["", true])
    },5000)
  }catch(exception){
  setErrorMessage('invalid credentials')
  setNotification(['wrong username or password', false])
  setTimeout(()=>{
  setErrorMessage(null)
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

const createBlog = async() => {
  const blog = {title, author, url}
try{
   await blogService.create(blog)
  //  setBlogs(response.data)
  setTimeout(() => {
    setNotification(["", true])
  }, 3000)
}catch(exception){
  setNotification(['blog cannot be created', false])
  setTimeout(()=>{
    setNotification(["", true])
    }, 3000)
    }
}

const addBlog = (event) => {
  event.preventDefault()
  const newBlog= {
    title,
  author,
  url
  }
  blogService
    .create(newBlog)
      .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setNotification([`${returnedBlog.title} is added by ${user.name}!`, true])
      setTimeout(()=> {
      setNotification(['', true])
      }, 3000)
      setAuthor('')
      setTitle('')
      setUrl('')
    })
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

if(user === null){
return (
  <form onSubmit = {handleLogin}>
  <div>
    <h2>Log in to application</h2>
    <Notification notification= {notification}/>
  <div>
    username
    <input type ='text' value={username} name ="username" onChange = {({target}) => setUsername(target.value)}/>
  </div>
  <div>
    password
    <input  type ='text' value={password} name="password" onChange = {({target}) => setPassword(target.value)}/>
  </div>
  </div>  
  <button type="submit" onClick = {handleLogOut}>login</button>
  </form>
)
}

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification= {notification}/>
      <p>{user.name} logged in</p>       
      <button type="submit" onClick= {handleLogOut}>logout</button>
      <hr></hr>
      <CreateNewForm createBlog= {createBlog} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} />
      )}
    </div>
  )
      }
      export default App
      