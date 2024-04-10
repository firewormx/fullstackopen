import { useState, forwardRef, useImperativeHandle} from "react";

const Togglable = forwardRef((props, ref) =>{
const [visible, setVisible] = useState(false)

const hideWhenVisible = {display: visible ? 'none' : ''}
const showWhenVisible = {display: visible ? '' : 'none'}

const handleVisibleButton = () => {
setVisible(!visible)
}

useImperativeHandle (ref, ()=>{
return {
    handleVisibleButton
}
}
)

return(<>
    <div style={hideWhenVisible}>
        <button onClick={handleVisibleButton}>{props.buttonLabel}</button>
    </div>
    <div style ={showWhenVisible}>
        {props.children}
    <button onClick={handleVisibleButton}>cancel</button>
    </div>
    </>
)
})
export default  Togglable