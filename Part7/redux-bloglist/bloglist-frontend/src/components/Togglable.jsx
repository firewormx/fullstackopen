import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const handleVisibleButton = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      handleVisibleButton,
    };
  });

  return (
    <>
      <div style={hideWhenVisible}>
        <Button onClick={handleVisibleButton} variant='primary'>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <Button onClick={handleVisibleButton} variant='primary'>cancel</Button>
      </div>
    </>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
