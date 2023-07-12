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
    setTodos(todos.filter(todo => todo._id !== selectedTodo._id));

    await deleteTodo(selectedTodo._id);
  };

  const onEditTodo = async (selectedTodo: Todo) => {
    setTodos(todos.map(todo => (todo._id === selectedTodo._id ? selectedTodo : todo)));

    await updateTodo(selectedTodo);
  };

  return (
    <ul>
      {todos.map(todo => (
        <li className="todo-list-item">
          <TodoListItem key={todo._id} todo={todo} onRemove={onRemoveTodo} onEdit={onEditTodo} />
        </li>
      ))}
    </ul>
  );
};
