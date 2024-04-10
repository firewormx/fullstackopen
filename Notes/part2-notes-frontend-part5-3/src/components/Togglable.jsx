import { useState, forwardRef, useImperativeHandle} from 'react'
// forwardRef lets your component expose a DOM node to parent component with a ref.

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

// useImperativeHandle(ref, createHandle, dependencies?), React hook to customize the handle exposed as a ref.
  useImperativeHandle(ref,() => {
return {
    toggleVisibility
}
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}
)
export default Togglable