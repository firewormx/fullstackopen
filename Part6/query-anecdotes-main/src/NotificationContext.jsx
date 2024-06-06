import {useReducer,createContext, useContext} from "react"

const NotificationContext = createContext()

const notificationReducer = (notification, action) => {
    switch(action.type){
      case 'create' : return `anecdote '${action.payload}' created`
      case 'vote' : return `anecdote '${action.payload}' voted`
      case 'remove': return null
      case 'error': return 'too short anecdote, must have length 5 or more'
      default: return notification
    }
    }

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, ``)
    return (
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {props.children}
            </NotificationContext.Provider>
    )
}
export const useNotificationValue =() => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}

export default NotificationContext