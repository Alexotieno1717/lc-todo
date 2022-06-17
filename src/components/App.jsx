import { useState } from 'react';
import '../reset.css';
import '../App.css';

function App() {
   
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'Finish React Series',
      isComplete: false,
      isEditting: false
    },
    {
      id: 2,
      title: 'Go Grocery',
      isComplete: true,
      isEditting: false
    },
    {
      id: 3,
      title: 'Take over world',
      isComplete: false,
      isEditting: false
    },
  ]);

  const [todoInput, setTodosInput] = useState('');
  const [idFortodo, setIdForTodo] = useState(4);

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

  setTodosInput('');
  setIdForTodo(prevIdForTodo => prevIdForTodo + 1);
  }

  function deleteTodo(id) {
     setTodos([... todos].filter(todo => todo.id !== id));
  }

  function handleInput(event) {
    setTodosInput(event.target.value)
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
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <form action="#" onSubmit={ addTodo }>
          <input
            type="text"
            value={todoInput}
            onChange={handleInput}
            className="todo-input"
            placeholder="What do you need to do?"
          />
        </form>

        <ul className="todo-list">
          {todos.map((todo, index) => (
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

        <div className="check-all-container">
          <div>
            <div className="button">Check All</div>
          </div>

          <span>3 items remaining</span>
        </div>

        <div className="other-buttons-container">
          <div>
            <button className="button filter-button filter-button-active">
              All
            </button>
            <button className="button filter-button">Active</button>
            <button className="button filter-button">Completed</button>
          </div>
          <div>
            <button className="button">Clear completed</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
