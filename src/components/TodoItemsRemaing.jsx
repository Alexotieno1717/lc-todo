import React, { useContext } from 'react'
import { TodosContext } from '../context/TodosContext';


function TodoItemsRemaing() {

  const { todos, setTodos } = useContext(TodosContext);

  function remaining() {
    return todos.filter(todo => !todo.isComplete).length;
  }

  return (
    <span>{remaining()} items remaining</span>
  )
}

export default TodoItemsRemaing