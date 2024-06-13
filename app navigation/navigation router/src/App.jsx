import {
  // BrowserRouter as Router,
  useMatch,
  Routes, Route, Link, Navigate
} from 'react-router-dom'
import { useState } from 'react'
import Home from './Components/Home'
import Notes from './Components/Notes'
import Users from './Components/Users'
import Note from './Components/Note'
import Login from './Components/Login'
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import Navbar from 'react-bootstrap/Navbar'
import { Nav } from 'react-bootstrap'
import { Container } from '@mui/material';

const App = () => {
{/* <Container> */}
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen'
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false,
      user: 'Matti Luukkainen'
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas'
    }
  ])

const [user, setUser] = useState(null)
const [message, setMessage] = useState(null)

//Returns (browser)match data obj about a route at the given path relative to the current location.
const match = useMatch('/notes/:id')

const note =  match 
           ? notes.find(note => note.id === Number(match.params.id)) 
           : null

const login =(user) =>{
  if(user){
    setUser(user)
    setMessage(`welcome ${user}`)
    setTimeout(()=>{
     setMessage(null)
    },5000)
  }
return null
}

  const padding = {
    padding: 5
  }

  return (
    <div className='container'>
      {(message && 
        <Alert variant='success'>{message}</Alert>
      )}
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
      <Navbar.Collapse id='responsive-navbar-nav'>

        <Nav className='me-auto'>
     <Nav.Link href="#" as="span">
     <Link style={padding} to="/">home</Link>
     </Nav.Link>
    
     <Nav.Link href="#" as="span">
     <Link style={padding} to="/notes">notes</Link>
     </Nav.Link>

     <Nav.Link href="#" as="span">
     <Link style={padding} to="/users">users</Link>
      </Nav.Link>
   
      <Nav.Link href="#" as="span">
      {user
            ? <em>{user} logged in</em>
            : <Link style={padding} to="/login">login</Link>
          }
        </Nav.Link>
        </Nav>
        </Navbar.Collapse>
 
        </Navbar>

      <Routes>
          <Route path="/notes/:id" element={<Note note={note} />} />
          <Route path="/notes" element={<Notes notes={notes} />} />
          <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
          <Route path="/login" element={<Login onLogin={login} />} />
          <Route path="/" element={<Home />} />
        </Routes>

      <footer>
        <br />
        <em>Note app, Department of Computer Science 2024</em>
      </footer>
      </div>
  )
  // </Container>
}

export default App