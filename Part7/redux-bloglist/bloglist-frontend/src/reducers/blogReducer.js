import {createSlice} from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers:{
        setBlogs(state, action){
        return action.payload
        },
        appendBlog(state, action){
            state.push(action.payload)
        },
        updateBlog(state, action){
            const updatedBlog = action.payload
            const blogToVote = state.find(blog => blog.id === updatedBlog.id)
            return state.map(blog => blog.id !== blogToVote.id ? blog : updatedBlog)
        },
        removeBlog(state, action){
           const deleteBlog = action.payload
          return  state.filter(blog => blog.id !== deleteBlog.id)
        }
    }
})
export const {setBlogs, appendBlog, updateBlog, removeBlog} = blogSlice.actions

export const initialBlogs = () => {
return async(dispatch) =>{
const blogs = await blogService.getAll()
dispatch(setBlogs(blogs))
}
}

export const createBlog = (object) => {
return async(dispatch) => {
const newBlog = await blogService.create(object)
dispatch(appendBlog(newBlog))
}
}

export const deleteBlog = (id) => {
return async(dispatch) => {
const blogToDelete = await blogService.remove(id)
dispatch(removeBlog(blogToDelete))
}
}

export const likeBlog = (blogToLike) => {
 return async(dispatch) => {
    const updatedBlog = await blogService.update({...blogToLike, likes: blogToLike.likes+ 1})
    dispatch(updateBlog(updatedBlog))
 }
}
export default blogSlice.reducer