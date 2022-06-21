import React, { useContext } from 'react'
import { TodosContext } from '../context/TodosContext';



function ClearCompleted() {
  const { todos, setTodos } = useContext(TodosContext);

  function clearCompleted() {
    setTodos([...todos].filter(todo => !todo.isComplete));
  }

  return (
    <button onClick={clearCompleted} className="button">Clear completed</button>
  )
}

export default ClearCompleted