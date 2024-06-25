import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const handleVisibleButton = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      handleVisibleButton,
    };
  });

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={handleVisibleButton} className="createNew">
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <button onClick={handleVisibleButton}>cancel</button>
      </div>
    </>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
Togglable.displayName = "Togglable";

export default Togglable;
