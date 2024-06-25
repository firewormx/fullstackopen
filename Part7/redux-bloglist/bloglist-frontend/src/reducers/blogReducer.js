import {createSlice} from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = [
{
    title: 'China News',
    author: 'Lili Wang',
    url: 'http://newsChina.com',
    likes: 210
},
{
    title: 'Japan News',
    author: 'Akimoto',
    url: 'http://newsJapan.co.jp',
    likes: 200
}
]

const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers:{
        setBlogs(state, action){
        return action.payload
        },
        appendBlog(state, action){
            state.concat(action.payload)
        },
        updateBlog(state, action){
            const updatedBlog = action.payload
            const blogToVote = state.find(blog => blog.id === updatedBlog.id)
            return state.map(blog => blog.id !== blogToVote.id ? blog : updatedBlog)
        },
        removeBlog(state, action){
           const deleteBlog = action.payload
           setBlogs(state.filter(blog => blog.id !== deleteBlog.id))
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

export const deleteBlog = (object) => {
return async(dispatch) => {
const blogToDelete = await blogService.remove(object)
dispatch(removeBlog(blogToDelete))
}
}

export const likeBlog = (id, object) => {
 return async() => {
    const updatedBlog = await blogService.update(id, object)
    dispatch(updateBlog(updatedBlog))
 }
}
export default blogSlice.reducer