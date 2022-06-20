import { useState } from 'react';
import NoTodos from './NoTodos';
import '../reset.css';
import '../App.css';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

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

   const [idFortodo, setIdForTodo] = useState(4);

  function addTodo(todo) {
    setTodos([...todos, {
      id: idFortodo,
      title: todo,
      isComplete: false
    },
  ]);

  setIdForTodo(prevIdForTodo => prevIdForTodo + 1);
  }

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

  function remaining() {
    return todos.filter(todo => !todo.isComplete).length;
  }

  function clearCompleted() {
    setTodos([...todos].filter(todo => !todo.isComplete));
  }

  function completeAllTodos(params) {
    const updatedTodos = todos.map(todos => {
      todos.isComplete = true
      
      return todos;
    })

    setTodos(updatedTodos);
  }

  function todosFiltered(filter) {
    if (filter === 'all') {
      return todos;
    } else if (filter === 'active') {
      return todos.filter(todo => !todo.isComplete);
    } else if (filter === 'completed') {
      return todos.filter(todo => todo.isComplete);
    }
  }



  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>

        <TodoForm addTodo={addTodo} />

        { todos.length > 0 ? (
          <TodoList
            todos={todos}
            completeTodo={completeTodo}
            markAsEditting={markAsEditting}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
            remaining={remaining}
            clearCompleted={clearCompleted}
            completeAllTodos={completeAllTodos}
            todosFiltered={todosFiltered}
          />
        ) : (
          <NoTodos />
        )}
      </div>
    </div>
  );
}

export default App;
