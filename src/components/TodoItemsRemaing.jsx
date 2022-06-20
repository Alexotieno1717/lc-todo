import React from 'react'
import PropTypes from "prop-types";

TodoItemsRemaing.propTypes = {
    remaining: PropTypes.func.isRequired,
};

function TodoItemsRemaing(props) {
  return (
    <span>{props.remaining()} items remaining</span>
  )
}

export default TodoItemsRemaing