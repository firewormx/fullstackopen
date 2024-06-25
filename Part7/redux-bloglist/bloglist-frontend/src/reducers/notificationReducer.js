import {createSlice} from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        updateNotifications(state, action){
      state = action.payload
      return state
        },
        removeNotification(state, action){
       state = null
       return state
        }
    }
})
export const {updateNotifications, removeNotification} = notificationSlice.actions 

export const setNotifications = (content, time) => {
return (dispatch) => {
 dispatch(updateNotifications(content))
 setTimeout(() => {
      dispatch(removeNotification())
 }, time * 1000)
}
}

export default notificationSlice.reducer