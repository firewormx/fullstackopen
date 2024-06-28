import { useDispatch, useSelector } from "react-redux";
import { setNotifications } from "../reducers/notificationReducer";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { useMatch } from "react-router-dom";
import Togglable from "./Togglable";
import { useRef } from "react";

const Blog = () => {
const dispatch = useDispatch()
const blogs =  useSelector(({blogs} )=> blogs)
const user = useSelector(({user}) => user)
const blogFormRef = useRef()

const match = useMatch('/blogs/:id')
const blog = match ? blogs.find(blog => blog.id === String(match.params.id)) : null 
if(!blog) return null

const updateLikes =() => {
  dispatch(likeBlog(blog))
  dispatch(setNotifications(`${blog.title} liked`, 2))
}

const handleDeleteButton = () => {
  dispatch(deleteBlog(match.params.id))
  dispatch(setNotifications(`${blog.title} has been removed from server`, 3))
}
  const blogStyle = {
    paddingTop: 10,
    padding: 10,
    marginRight: 20,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
        <div>
        {blog.title} {blog.author}
      </div>
      <Togglable buttonLabel="view blog" ref={blogFormRef}>
  
      <div className="togglableContent">
        <div data-testid="title">{blog.title}</div>
        <div data-testid="author">{blog.author}</div>
        <br />
        <a href={blog.url}>{blog.url}</a>
        <div id="likes">
          {blog.likes}
          <button onClick={updateLikes} data-testid="like">
            like
          </button>
        </div>
        <div data-testid="blog-author">{blog.author}</div>
      </div>

      {user.username === blog.author && (
        <button onClick={handleDeleteButton}>remove</button>
      )}
      </Togglable>
    </div>
  );
};

export default Blog;
