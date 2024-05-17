import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, fetchTodos } from '../slices/todosSlice';
import styles from '../styles/TodoList.css';

const TodoList = () => {
  const [newTodoText, setNewTodoText] = useState('');
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleChange = (e) => {
    setNewTodoText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      dispatch(addTodo({
        text: newTodoText,
      }));
      setNewTodoText('');
    }
  };

  return (
    <div className='background'>
      <form onSubmit={handleSubmit}>
        <input className='input'
          type="text"
          value={newTodoText}
          onChange={handleChange}
          placeholder="Add a new todo..."
        />
        <button className='button' type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li className='todo-text' key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;