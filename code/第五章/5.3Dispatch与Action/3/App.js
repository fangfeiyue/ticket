import React, { useState, useRef, useEffect, memo } from 'react';
import './App.css';
import {
  createSet,
  createAdd,
  createRemove,
  createToggle
} from './action.js'

const Control = memo(function Control(props) {
  const { dispatch } = props;
  const inputRef = useRef();
  const onSubmit = (e) => {
    e.preventDefault();
    const text = inputRef.current.value.trim();

    if (!text) return;
    dispatch(createAdd({
      id: Math.random(),
      text,
      complete: false
    }));
    inputRef.current.value = '';
  };
  return (
    <div className="control">
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          ref={inputRef}
          className="new-todo"
          placeholder="What need to be done?"
        />
      </form>
    </div>
  );
});

const TodoItem = memo(function TodoItem(props) {
  const { todo: { id, complete, text }, dispatch } = props;

  return (
    <li className="todo-item">
      <input 
        type="checkBox"
        onChange={()=>dispatch(createToggle(id))}
        checked={complete}
      />
      <label className={complete ? 'complete' : ''}>{ text }</label>
      <button onClick={()=>dispatch(createRemove(id))}>&#xd7;</button>
    </li>
  );
});

const Todos = memo(function Todos(props) {
  const { todos, dispatch } = props;
  return (
    <ul>
      {
        todos.map(todo => <TodoItem 
            key={todo.id} 
            todo={todo} 
            dispatch={dispatch} 
          />)
      }
    </ul>
  );
});

function TodoList() {
  const [todos, setTodos] = useState([]);

  const dispatch = (action) => {
    const { type, payload } = action;
    switch(type) {
      case 'set':
        setTodos(payload);
        break;
      case 'add':
        setTodos(todos => [...todos, payload]);
        break;
      case 'remove':
        setTodos(todos=>todos.filter(todo => todo.id !== payload))
        break;
      case 'toggle':
        setTodos(todos=>todos.map(todo => todo.id === payload ? {...todo, complete: !todo.complete} : todo))
        break;
      default:
    }
  };

  useEffect(() => {
    dispatch(createSet(JSON.parse(localStorage.getItem('todo-list-key') || '[]')));
  }, []);
  useEffect(() => {
    localStorage.setItem('todo-list-key', JSON.stringify(todos));
  }, [todos]);
  return (
    <div className="todo-list">
      <Control dispatch={dispatch}/>
      <Todos dispatch={dispatch} todos={todos}/>
    </div>
  );
}

export default TodoList;
