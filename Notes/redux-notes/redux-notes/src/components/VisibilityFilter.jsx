import { filterChange } from "../reducers/filterReducer";
import {useDispatch} from 'react-redux'

const VisibilityFilter = (props) => {
const dispatch = useDispatch()

return (
    <div>
     <input type ="radio" name='filter' onChange= {() => dispatch(filterChange('All'))}/>All
              <input type ="radio" name='filter' onChange= {() => dispatch(filterChange('Important'))} />important
              <input type="radio" name='filter' onChange= {() => dispatch(filterChange('nonImportant'))} />nonimportant
            </div>
)
}
export default VisibilityFilter