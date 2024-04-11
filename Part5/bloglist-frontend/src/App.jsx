import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from "./components/LoginForm"
import Togglable from './components/Togglable'
import CreateNewForm from './components/CreateNewForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(['', true])
  const [updateBlogs, setUpdateBlogs]= useState(false)

  const newBlogRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  
  useEffect(() => {
    blogService.getAll().then(blogs =>{
      blogs.sort((a,b)=> b.likes - a.likes)
      setBlogs( blogs )
    } )  
  }, [updateBlogs])

  const toggleLikesOf = async(id) => {
    const blog = blogs.find(blog => blog.id === id)
    const changedBlog = {...blog, likes: blog.likes +1}
    try{
    const returnedBlog = await blogService.update(id, changedBlog)
     setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))

     setUpdateBlogs(!updateBlogs)

    }catch(error){
      setErrorMessage(`Note ${blog.likes} was already removed from server`)
      setTimeout(()=>{
        setErrorMessage(null)
      }, 5000)
    }
  }

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

const addBlog = async (newBlog) => {

newBlogRef.current.handleVisibleButton()

  try{
    const returnedBlog = await blogService.create(newBlog)
    setBlogs(blogs.concat(returnedBlog))

    setUpdateBlogs(!updateBlogs)
    
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
}

const handleUsernameChange = ({target}) => {
setUsername(target.value)
}

const handlePasswordChange = ({target}) => {
setPassword(target.value)
}


const deleteBlog = async(id) => {
  try{
    await blogService.remove(id)
    setUpdateBlogs(!updateBlogs)
setNotification([`Blog successfully removed`, true])

setTimeout(() => {
  setNotification(["", true])
}, 3000)

  }catch(error){
    console.log('error happens when deleting the blog', error)
    setNotification([`Blog by Id ${id} does not exist`, false] )
    setTimeout(() => {
      setNotification(["", true])
    }, 3000)
  }
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
      <Togglable buttonLabel= 'create new note' ref={newBlogRef}>
      <CreateNewForm addBlog={addBlog}/>
      </Togglable>
      <br></br>
      {blogs.map(blog =>
      <Blog key={blog.id}
         blog={blog} 
         user={user}
         toggleLikes={()=> toggleLikesOf(blog.id)} 
         deleteBlog ={()=> deleteBlog(blog.id)}
         />
      )}

    </div>
  )
      }
      export default App
      