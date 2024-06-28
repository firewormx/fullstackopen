import {configureStore} from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
import commentReducer from './reducers/commentReducer'

const store = configureStore({
    reducer:{ 
        notification: notificationReducer,
        blogs: blogReducer,
        user: userReducer,
        users: usersReducer,
        comment: commentReducer
    }
   
})
export default store