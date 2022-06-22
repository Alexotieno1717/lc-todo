import { useEffect, useState, useRef } from 'react';
import NoTodos from './NoTodos';
import '../reset.css';
import '../App.css';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import useLocalStorage from '../hooks/useLocalStorage';
import { TodosContext } from '../context/TodosContext';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

function App() {

  // const [name, setName] = useState('');
  const [name, setName] = useLocalStorage('name', '');

  const nameInputEl = useRef(null);
  const [todos, setTodos] = useLocalStorage('todos', []);
    
  const [idFortodo, setIdForTodo] = useLocalStorage('idForTodo', 1);

  const [filter, setFilter] = useState('all');

  function todosFiltered() {
    if (filter === 'all') {
      return todos;
    } else if (filter === 'active') {
      return todos.filter(todo => !todo.isComplete);
    } else if (filter === 'completed') {
      return todos.filter(todo => todo.isComplete);
    }
  }

  useEffect(() => {
    // console.log('use effect running');
    nameInputEl.current.focus();

    // setName(JSON.parse(localStorage.getItem('name')) ?? '')

  }, []);

  function handleNameInput(event) {
    setName(event.target.value)
    // localStorage.setItem('name', JSON.stringify(event.target.value));
  }



  return (
    <TodosContext.Provider value={{ todos, setTodos, idFortodo, setIdForTodo, todosFiltered, filter, setFilter }}>
      <div className="todo-app-container">
        <div className="todo-app">
          <div className="name-container">
            <h2>What is your Name?</h2>
            <form action="#">
              <input
                type="text"
                ref={nameInputEl}
                className="todo-input"
                placeholder="What is your name"
                value={name}
                onChange={handleNameInput}
              />
            </form>
            <CSSTransition
              in={name.length > 0}
              timeout={300}
              classNames="slide-vertical"
              unmountOnExit
            >
              <p className="name-label">Hello, {name}</p>
            </CSSTransition>
          </div>
          <h2>Todo App</h2>

          <TodoForm />

          <SwitchTransition mode="out-in">
            <CSSTransition
              key={todos.length > 0}
              timeout={300}
              classNames="slide-vertical"
              unmountOnExit
            >
              {todos.length > 0 ? <TodoList /> : <NoTodos />}
            </CSSTransition>
          </SwitchTransition> 
        </div>
      </div>
    </TodosContext.Provider>
  );
}

export default App;
