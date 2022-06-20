import React from 'react'
import PropTypes from "prop-types";

ClearCompleted.propTypes = {
    clearCompleted: PropTypes.func.isRequired,
};


function ClearCompleted(props) {
  return (
    <button onClick={props.clearCompleted} className="button">Clear completed</button>
  )
}

export default ClearCompleted