import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs'

const commentSlice = createSlice({
    name:'comment',
    initialState: [
    {id: 1, cotent:'greate!'},
    {id: 2, content: 'test again!'}
],
reducers: {
    setComment(state, action){
        return action.payload
    },
    appendComment(state, action){
        return state.push(action.payload)
    }
}
})
export const {setComment, appendComment} = commentSlice.actions

export const initializeComments = (id) => {
    return dispatch => {
        const comments = blogService.getComment(id)
        dispatch(setComment(comments))
    }
}

export const createComment =(id, content) =>{
return dispatch => {
    const newComment = blogService.postComment()
    dispatch(appendComment(newComment))
}
}
export default commentSlice.reducer