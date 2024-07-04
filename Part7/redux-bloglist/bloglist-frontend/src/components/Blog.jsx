import { useDispatch, useSelector } from "react-redux";
import { setNotifications } from "../reducers/notificationReducer";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
import { useMatch } from "react-router-dom";
import Togglable from "./Togglable";
import { useRef } from "react";
import Comment from "./Comment";

const Blog = () => {
const dispatch = useDispatch()
const blogs =  useSelector(({blogs} )=> blogs)
const user = useSelector(({user}) => user)
const blogFormRef = useRef()

const match = useMatch('/blogs/:id')
const blog = match ? blogs.find(blog => blog.id === String(match.params.id)) : null 
if(!blog) return null

const updateLikes =() => {
  const updatedBlog = {
    ...blog,
    likes: blog.likes + 1
  }
  dispatch(likeBlog(blog.id, updatedBlog))
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
        <h2 data-testid="title">{blog.title} {blog.author}</h2>
        <a href={blog.url}>{blog.url}</a>
        <div id="likes">
          {blog.likes} likes
          <button onClick={updateLikes} data-testid="like">
            like
          </button>
        </div>
        <div data-testid="blog-author">added by {blog.user.name}</div>
      </div>

      {user.username === blog.author && (
        <button onClick={handleDeleteButton}>remove</button>
      )}
      </Togglable>
      <Comment id={blog.id}/>
    </div>
  );
};

export default Blog;
