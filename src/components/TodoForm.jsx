import React, { useContext, useState } from 'react';  
import { TodosContext } from '../context/TodosContext';


function TodoForm() {

  const { todos, setTodos, idFortodo, setIdForTodo } = useContext(TodosContext);


    const [todoInput, setTodosInput] = useState('');

    function handleInput(event) {
        setTodosInput(event.target.value)
    }

    function addTodo(event) {
        event.preventDefault();

        if (todoInput.trim().length === 0) {
        return;
        }

        setTodos([...todos, {
          id: idFortodo,
          title: todoInput,
          isComplete: false
          },
        ]);
      
        setIdForTodo(prevIdForTodo => prevIdForTodo + 1);

        setTodosInput(''); 
        
    }

  return (
    <form action="#" onSubmit={ addTodo }>
        <input
        type="text"
        value={todoInput}
        onChange={handleInput}
        className="todo-input"
        placeholder="What do you need to do?"
        />
    </form>
  )
}

export default TodoForm