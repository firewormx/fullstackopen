import { useState } from 'react'

const Blog = ({ blog, user, toggleLikes, deleteBlog }) => {

  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const handleVisibleButton = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft:2,
    border: 'solid',
    borderWidth: 1,
    marginBottom:5
  }

  const handleRemoveButton = () => {
    if(window.confirm(`Removing blog ${blog.title} by ${user.name}`)){
      deleteBlog(blog.id)
    }
  }


  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} >
      {blog.title}  {blog.author}
        <button onClick={handleVisibleButton}>view</button>
      </div>

      <div style={showWhenVisible} className='togglableContent'>
        <div data-testid='title'>{blog.title}</div>
         <div data-testid='author'>{blog.author}</div>
        <button onClick={handleVisibleButton} id='hide-button'>hide</button>
        <br/>
        <a href={blog.url}>{blog.url}</a>
        <div id='likes'>
          {blog.likes}
          <button onClick={toggleLikes} data-testid="like">like</button>
        </div>
        <div data-testid='blog-author'>{blog.author}</div>
      </div>

      <button onClick={handleRemoveButton}>remove</button>
    </div>

  )
}

export default Blog