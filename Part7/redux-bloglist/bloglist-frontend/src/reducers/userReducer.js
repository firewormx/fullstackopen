import {createSlice} from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotifications } from './notificationReducer'


const initialState = []

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        setUser(state, action){
        state = action.payload
        return state
        },
        logOutUser(state, action){
         state = null
         return state
        },
        setLogin(state, action){
            return action.payload
        }
    }
})
export const {setUser, logOutUser, setLogin} = userSlice.actions

export const initializeUser = () => {
    return async (dispatch) => {
      const loggedUserJSON = window.localStorage.getItem("loggedInUser");
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        dispatch(setUser(user));
        blogService.setToken(user.token);
      }
    };
  };
  
  export const login = (username, password) => {
    return async (dispatch) => {
      try {
        const user = await loginService.login({
          username,
          password,
        });
        blogService.setToken(user.token);
        window.localStorage.setItem("loggedInUser", JSON.stringify(user));

        dispatch(setLogin(user)); 
        dispatch(setNotifications(`${user.username} logged in successfully!`, 5))

      } catch (exception) {
        console.log(exception);
        dispatch(setNotifications("failed: wrong username or password", 5));
      }
    };
  };
  
  export const logout = () => {
    return async (dispatch) => {
      window.localStorage.clear();
      dispatch(logOutUser());
      dispatch(setNotifications("Successfully logged out", 2))
    };
  };
  
  export default userSlice.reducer;