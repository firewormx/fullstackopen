import { useSelector } from "react-redux";
import {useMatch} from 'react-router-dom'

const User = () => {

    const users = useSelector( ({users}) => users )

    const match = useMatch('/users/:id')

    const user = match ? users.find(user => user.id === String(match.params.id)) : null // id found in String,not number

    if(!user) return null

return (
    <div>
        <h1>{user.name}</h1>
   <h3>added blogs</h3>

            <ul>
    {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
    </ul>
    </div>
)
}
export default User

