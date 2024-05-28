import {createSlice} from '@reduxjs/toolkit'

const initialState = 'initial message'

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers:{
        showNotification(state, action){

                state = action.payload
                return state
        

    },
     removeNotification(state, action){
            state = null
            return state

     }
        }
    }
)

export default notificationSlice.reducer
export const {showNotification, removeNotification} = notificationSlice.actions