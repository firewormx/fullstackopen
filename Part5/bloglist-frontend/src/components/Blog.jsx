import { useState } from "react"

const Blog = ({ blog, user, toggleLikes, deleteBlog}) => {

  const [visible, setVisible] = useState(false)
  const hideWhenVisible = {display: visible ? 'none' : ''}
  const showWhenVisible = {display: visible ? '' : 'none'}
  
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

// const label = () =>{
//  blog ? 'view ' : 'hide'
// }
const handleRemoveButton = () => {
  if(window.confirm(`Removing blog ${blog.title} by ${user.name}`)){
   deleteBlog(blog.id)
  }
}


  return (
    <div style={blogStyle}>
  <div style={hideWhenVisible} >
    {blog.title} {blog.author} 
    <button onClick={handleVisibleButton}>view</button>
    </div> 

    <div style={showWhenVisible}>
    {blog.title} {blog.author} 
    <button onClick={handleVisibleButton}>hide</button>
    <br/>
<div>{blog.url}</div>
<div>
  {blog.likes}
<button onClick={toggleLikes}>like</button>
</div>
<div>{blog.author}</div>
</div>

    <button onClick={handleRemoveButton}>remove</button>
  </div>

)
  }

export default Blog