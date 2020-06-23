import React, { useState, useCallback, useRef, useEffect, memo } from 'react';
import './App.css';

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

const Todos = (function Todos(props) {
  const { todos, removeTodo, toggleTodo } = props;

  return (
    <ul>
      {
        todos.map(todo=><TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} removeTodo={removeTodo} />)
      }
    </ul>
  );
});

function TodoList() {
  const [todos, setTodos] = useState([]);
  const addTodo = useCallback((todo) => {
    setTodos(todos => [...todos, todo]);
  }, []);
  const removeTodo = useCallback(id => setTodos(todos=>todos.filter(todo => todo.id !== id)), []);
  const toggleTodo = useCallback(id => setTodos(todos=>todos.map(todo => todo.id === id ? {...todo, complete: !todo.complete} : todo)), []);

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem('todo-list-key') || '[]'));
  }, []);
  useEffect(() => {
    localStorage.setItem('todo-list-key', JSON.stringify(todos));
  }, [todos]);
  return (
    <div className="todo-list">
      <Control addTodo={addTodo}/>
      <Todos removeTodo={removeTodo} toggleTodo={toggleTodo} todos={todos}/>
    </div>
  );
}

export default TodoList;
