import {BrowserRouter as Router,
  Routes, Route, Link} from 'react-router-dom'
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from './components/Notify';
import {useState} from 'react'

const App = () => {
const [errors, setErrors] = useState(null)

  const notify = (message) => {
setErrors(message)
setTimeout(() => {
setErrors(null)
},5000)
  }

const padding = {padding: 5}
  return (
    <Router>
      <div>
        <Link style={padding} to='/authors'>authors</Link>
        <Link style={padding} to='/books'>books</Link>
        <Link style={padding} to='/add'>add book</Link>
      </div>
      <Notify errorMessage={errors}/>

<Routes>
  <Route path='/authors' element={<Authors/>} />
<Route path='/books' element={<Books />} setError ={notify}/>
<Route path='/add' element={<NewBook />}/>
</Routes>
    </Router>
  );
};

export default App;
