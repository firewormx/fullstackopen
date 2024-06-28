import { createSlice } from "@reduxjs/toolkit";
const initialState = false

const visibleSlice = createSlice({
    name: 'visibility',
    initialState,
    reducers: {
     setVisibility(state, action){
     state = action.payload
    return state
     }
    }
})
export const {setVisibility} = visibleSlice.actions

export const updateVisibility = (style) => {
    return (dispatch) =>{
dispatch(setVisibility(style))
    }
}
export default visibleSlice.reducer