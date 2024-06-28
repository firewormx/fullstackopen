import { useSelector} from "react-redux";
import {Link} from "react-router-dom";

const UserList = () => {
  const users = useSelector(({users}) => users)

  return (
    <div>
      <h2>users</h2>
      <table>
        <tbody>
          <tr>
            <td>Username</td> 
            <td>blogs created</td>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>

              <td>&nbsp;{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default UserList;