import React, { useContext } from 'react';
import { TodosContext } from '../context/TodosContext';


function CompleteAllTodos() {

  const { todos, setTodos } = useContext(TodosContext);

  function completeAllTodos() {
    const updatedTodos = todos.map(todos => {
      todos.isComplete = true
      
      return todos;
    })

    setTodos(updatedTodos);
  }
  return (
    <div onClick={completeAllTodos} className="button">Check All</div>
  )
}

export default CompleteAllTodos