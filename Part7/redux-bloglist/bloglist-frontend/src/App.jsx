import {useEffect} from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import UserList from "./components/UserList";
import User from "./components/User";
import Home from "./components/Home";
import EachBlog from "./components/EachComment";

import { useDispatch, useSelector } from "react-redux";
import { initializeUser,logout } from "./reducers/userReducer";
import { initializeUsers } from "./reducers/usersReducer";
import { initialBlogs } from "./reducers/blogReducer";
import { Button, Navbar, Nav, Container } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
  crossorigin="anonymous"
/>

const App = () => {
const dispatch = useDispatch()

  useEffect(() => {
dispatch(initialBlogs())
dispatch(initializeUser())
dispatch(initializeUsers())
  }, [dispatch]);
  
const user = useSelector(({user}) => user)
const notification = useSelector(({notification}) => notification)

const handleLogOut = () => dispatch(logout())

const padding = {
  padding: 5
}
const margin = {
  margin: 5
}

  return (
      <div className="container">
        <Navbar expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/">
                  home
                </Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/users">
                  users
                </Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                {user ?
                 (
                  <em style={padding}>
                    {user.username} logged in
                     
  {<Button onClick={handleLogOut}style={margin} >logout</Button>}
                  </em>
                ) : (
                  <Link style={padding} to="/login">
                    login
                  </Link>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Notification  notification= {notification}/>
        {!user && ( 
          <div>
            <h2>Log in to application</h2>
            <LoginForm />
          </div>
        )}
  
        {user && (
          <div>
            <h2>blogs app</h2>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/users/:id" element={<User/>} />
              <Route path="/blogs/:id" element={<Blog/>} />
              <Route path="/login" elemet={<LoginForm/>} />
            </Routes>
          </div>
        )}
      </div>
  )
};
export default App;
