import {createSlice} from '@reduxjs/toolkit'
// const filterReducer = (state= '', action) => {
// switch(action.type){
//     case 'set_filter':  return action.payload
//     default: return state
// }
// }
// export const filterChange = (content) => {
// return {
//     type: 'set_filter',
//     payload: content
// }
// }

// export default filterReducer

const initialState = ''
const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterChange(state, action){
            state = action.payload
            return state
        }
    }
})
export const {filterChange} = filterSlice.actions
export default filterSlice.reducer 