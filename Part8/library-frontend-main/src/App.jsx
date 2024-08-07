import {BrowserRouter as Router,
  Routes, Route, Link} from 'react-router-dom'
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from './components/Notify';
import {useState} from 'react'
import LoginForm from './components/Login';
import Recommendations from './components/Recommendations';
import { useQuery, useApolloClient } from '@apollo/client';
import { ALL_BOOKS,GET_USER } from './queries';

const App = () => {
const [errors, setErrors] = useState(null)
const [token, setToken] = useState(null)
const books = useQuery(ALL_BOOKS)
const user = useQuery(GET_USER)
const client = useApolloClient()

  const notify = (message) => {
setErrors(message)
setTimeout(() => {
setErrors(null)
},5000)
  }

const padding = {padding: 5}

if(books.loading){
  return <div>loading...</div>
}
const logout = () => {
setToken(null)
localStorage.clear()
client.resetStore()
}

if(!token){
  return (
    <div>
      <Notify errorMessage={errors}/>
      <Router>
      <div>
        <Link style={padding} to='/authors'>authors</Link>
        <Link style={padding} to='/books'>books</Link>
        <Link style={padding} to = '/login'>login</Link>
        <Link style={padding} to='/'></Link>
      </div>
<Routes>
  <Route path='/authors' element={<Authors setError={notify}/>} />
<Route path='/books' element={<Books setError ={notify}/>} />
<Route path='/login' element={<LoginForm setToken={setToken} setError={notify}/>}/>
<Route path='/' element={<Books />}/>

</Routes>
</Router>
    </div>
  )
}
  return (
    <Router>
      <div>
        <Link style={padding} to='/authors'>authors</Link>
        <Link style={padding} to='/books'>books</Link>
        <Link style={padding} to='/addbooks'>add book</Link>
        <Link style={padding} to= '/recommend'>recommend</Link>
        <button onClick={logout}>logout</button>
      </div>

<Routes>
<Route path='/authors' element={<Authors setError={notify}/>} />
<Route path='/books' element={<Books setError ={notify}/>} />
<Route path='/addbooks' element={<NewBook setError = {notify}/>} />
<Route path='/login' element={<Books />}/>
<Route path='/recommend' element={<Recommendations result={books}  user={user.data.me}/>} />
</Routes>
<Notify errorMessage={errors}/>
    </Router>

  );
};

export default App;
