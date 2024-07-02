import { useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Table from 'react-bootstrap/Table'

const UserList = () => {
  const users = useSelector(({users}) => users)

  return (
    <div>
      <h1>users</h1>
      <Table>
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
      </Table>
    </div>
  );
};
export default UserList;