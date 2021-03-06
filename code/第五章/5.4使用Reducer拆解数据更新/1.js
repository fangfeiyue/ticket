import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import './App.css';
import {
  createSet,
  createAdd,
  createRemove,
  createToggle
} from './action.js'

function bindActionCreators(actionCreators, dispatch) {
  const ret = {};
  for (let key in actionCreators) {
    ret[key] = function(...args) {
      const actionCreator = actionCreators[key];
      const action = actionCreator(...args);
      dispatch(action);
    };
  }
  return ret;
}

function reducer(state, action) {
  const { type, payload } = action;
  const { todos, count } = state;
  switch(type) {
    case 'set':
      return {
        ...state,
        todos: payload,
        count: count + 1
      };
    case 'add':
      return {
        ...state,
        todos: [...todos, payload],
        count: count + 1
      };
    case 'remove':
      return {
        ...state,
        todos: todos.filter(todo=>todo.id !== payload)
      };
    case 'toggle':
      return {
        ...state,
        todos: todos.map(todo => todo.id === payload ? { ...todo, complete: !todo.complete } : todo)
      };
    default:
      return state;
  }
}

const Control = memo(function Control(props) {
  const { addTodo } = props;
  const inputRef = useRef();
  const onSubmit = (e) => {
    e.preventDefault();
    const text = inputRef.current.value.trim();

    if (!text) return;
    addTodo({
      id: Math.random(),
      text,
      complete: false
    });
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
  const { todo: { id, complete, text }, removeTodo, toggleTodo } = props;

  return (
    <li className="todo-item">
      <input 
        type="checkBox"
        onChange={()=>toggleTodo(id)}
        checked={complete}
      />
      <label className={complete ? 'complete' : ''}>{ text }</label>
      <button onClick={()=>removeTodo(id)}>&#xd7;</button>
    </li>
  );
});

const Todos = memo(function Todos(props) {
  const { todos, removeTodo, toggleTodo } = props;
  return (
    <ul>
      {
        todos.map(todo => <TodoItem 
            key={todo.id} 
            todo={todo} 
            removeTodo={removeTodo}
            toggleTodo={toggleTodo}
          />)
      }
    </ul>
  );
});

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [count, setCount] = useState(0);
  const dispatch = useCallback((action) => {
    const state = {
      todos,
      count
    };

    const setters = {
      todos: setTodos,
      count: setCount
    };

    const newState = reducer(state, action);
    for (let key in newState) {
      setters[key](newState[key]);
    }
  }, [todos, count]);

  useEffect(() => {
    dispatch(createSet(JSON.parse(localStorage.getItem('todo-list-key') || '[]')));
  }, []);
  useEffect(() => {
    localStorage.setItem('todo-list-key', JSON.stringify(todos));
  }, [todos]);
  return (
    <div className="todo-list">
      <Control
        {
          ...bindActionCreators({
            addTodo: createAdd
          }, dispatch)
        }
      />
      <Todos {
        ...bindActionCreators({
          removeTodo: createRemove,
          toggleTodo: createToggle
        }, dispatch)
      } todos={todos}/>
    </div>
  );
}

export default TodoList;
