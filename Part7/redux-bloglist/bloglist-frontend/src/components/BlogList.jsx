import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => {
    return blogs;
  });

  const copy = [...blogs];
  const sortedBlogs = copy.sort((a, b) => b.likes - a.likes); 

  return (
    <div>
      <Table striped>
        <tbody>
          {sortedBlogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
              <td>{blog.author}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default BlogList;