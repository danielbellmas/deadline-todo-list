import React, { useState, useEffect } from 'react';
import { TodoList } from './components/todo-list/TodoList';
import { Todo } from './types/todo';
import { TodoForm } from './components/todo-form/TodoForm';
import { createTodo, fetchAllTodos } from './services/api';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    (async () => {
      try {
        setTodos(await fetchAllTodos());
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const addTodo = async (newTodo: Omit<Todo, '_id'>) => {
    const createdTodo = await createTodo({ ...newTodo, deadline: new Date(newTodo.deadline) });

    setTodos([...todos, createdTodo]);
  };

  return (
    <div className="App">
      <h1>Deadline Todo List</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
