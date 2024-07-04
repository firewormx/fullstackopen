import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs'

const commentSlice = createSlice({
    name:'comments',
    initialState: [
    {id: 1, content:'hey June!'},
    {id: 2, content: 'test again!'}
],
reducers: {
    setComment(state, action){
        return action.payload
    },
    appendComment(state, action){
        state.push(action.payload)
    }
}
})
export const {setComment, appendComment} = commentSlice.actions

export const initializeComments = (id) => {
    return async (dispatch)=> {
        const comments = await blogService.getComment(id)
        dispatch(setComment(comments))
    }
}

export const createComment =(id, content) =>{
return async (dispatch) => {
    const newComment = await blogService.postComment(id, content)
    dispatch(appendComment(newComment))
}
}
export default commentSlice.reducer