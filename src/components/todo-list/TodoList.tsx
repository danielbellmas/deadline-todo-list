import React, { FC } from 'react';
import { Todo } from '../../types/todo';
import { TodoListItem } from '../todo-list-item/TodoListItem';
import { deleteTodo, updateTodo } from '../../services/api';
import './TodoList.css';

interface TodoListProps {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
}

export const TodoList: FC<TodoListProps> = ({ todos, setTodos }) => {
  const onRemoveTodo = async (selectedTodo: Todo) => {
    try {
      await deleteTodo(selectedTodo._id);
      setTodos(todos.filter(todo => todo._id !== selectedTodo._id));
    } catch (error) {
      console.error(error);
    }
  };

  const onEditTodo = async (selectedTodo: Todo) => {
    try {
      await updateTodo(selectedTodo);
      setTodos(todos.map(todo => (todo._id === selectedTodo._id ? selectedTodo : todo)));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <li key={todo._id} className="todo-list-item">
          <TodoListItem todo={todo} onRemove={onRemoveTodo} onEdit={onEditTodo} />
        </li>
      ))}
    </ul>
  );
};
