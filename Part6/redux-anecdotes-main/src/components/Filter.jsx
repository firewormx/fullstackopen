import { filterChange } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"

const Filter = () => {
    const dispatch = useDispatch()

    const handleInputChange = (event) => {
    const content = event.target.value
    dispatch(filterChange(content))
    }
const style = {
    marginBottom: 10
}

    return (
<div style ={style}>filter
    <input  name='serach' onChange ={handleInputChange}/>
</div>
    )
}

export default Filter