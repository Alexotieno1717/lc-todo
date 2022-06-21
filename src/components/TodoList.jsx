import React, { useContext } from 'react';
import TodoItemsRemaing from './TodoItemsRemaing';
import ClearCompleted from './ClearCompleted';
import CompleteAllTodos from './CompleteAllTodos';
import TodoFilters from './TodoFilters'; 
import useToggle from '../hooks/useToggle'; 
import { TodosContext } from '../context/TodosContext';



function TodoList() {
  const { todos, setTodos, todosFiltered } = useContext(TodosContext);
  const [isFeaturesOneVisible, setFeaturesOneVisible] = useToggle();
  const [isFeaturesTwoVisible, setFeaturesTwoVisible] = useToggle();
  
  function deleteTodo(id) {
    setTodos([...todos].filter(todo => todo.id !== id));
 }


 function completeTodo(id) {
   const updatedTodos = todos.map(todos => {
     if (todos.id === id) {
       todos.isComplete = !todos.isComplete
     }

     return todos;
   })

   setTodos(updatedTodos);
 }

 function markAsEditting(id) {
   const updatedTodos = todos.map(todos => {
     if (todos.id === id) {
       todos.isEditting = true
     }

     return todos;
   })

   setTodos(updatedTodos);
 }

 function updateTodo(event, id) {
   const updatedTodos = todos.map(todos => {
     if (todos.id === id) {
       if (event.target.value.trim().length === 0) {
         todos.isEditting = false;
         return todos;
       }
       todos.title = event.target.value
       todos.isEditting = false;
     }

     return todos;
   })

   setTodos(updatedTodos);
 }

  return (
    <>
        <ul className="todo-list">
          {todosFiltered().map((todo, index) => (
            <li key={todo.id} className="todo-item-container">
              <div className="todo-item">
                <input type="checkbox" onChange={() => completeTodo(todo.id)} checked={todo.isComplete ? true : false } />
                {!todo.isEditting ? (
                  <span onDoubleClick={() => markAsEditting(todo.id)} className={`todo-item-label ${todo.isComplete ? 'line-through' : ''}` }>{todo.title}</span>
                ) : (
                  <input 
                  onBlur={(event) => updateTodo(event, todo.id)}
                  onKeyDown={event => {
                    if (event.key === 'Enter') {
                      updateTodo(event, todo.id);
                    }  
                  }}
                  type="text" 
                  className="todo-item-input" 
                  defaultValue={todo.title} 
                  autoFocus
                  />
                )}
              </div>
              <button onClick={() => deleteTodo(todo.id)} className="x-button">
                <svg
                  className="x-button-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        <div className="toggles-container">
          <button onClick={setFeaturesOneVisible} className="button">
            Features One Toggle
          </button>
          <button onClick={setFeaturesTwoVisible} className="button">
            Features Two Toggle
          </button>
        </div>
        {isFeaturesOneVisible && (
          <div className="check-all-container">
            <div>
              <CompleteAllTodos />
            </div>

            <TodoItemsRemaing />
          </div>
        )}

        {isFeaturesTwoVisible && (  
        <div className="other-buttons-container">
            <TodoFilters />
          <div>
            <ClearCompleted />
          </div>
        </div>
        )}
        </> 
        
  )
}

export default TodoList