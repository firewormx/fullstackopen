const filterReducer = (state= '', action) => {
switch(action.type){
    case 'set_filter':  return action.payload
    default: return state
}
}
export const filterChange = (content) => {
return {
    type: 'set_filter',
    payload: content
}
}

export default filterReducer