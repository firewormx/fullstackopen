import {createSlice} from '@reduxjs/toolkit'

const initialState = 'initial message'

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers:{
        showNotification(state, action){
                state = action.payload
                return  state
    },
     removeNotification(state){
            state = null
            return state
     }
        }
    }
)

export const setNotifications = (text, time) => {
    return async dispatch => {
        await dispatch(showNotification(text))
        setTimeout(() => {
              dispatch(removeNotification())
    }, time * 1000)
}
}

export default notificationSlice.reducer
export const {showNotification, removeNotification} = notificationSlice.actions