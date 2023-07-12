import React, { FormEvent, useState } from 'react';
import { Todo } from '../../types/todo';

interface TodoFormProps {
  addTodo: (newTodo: Omit<Todo, '_id'>) => Promise<void>;
}

export const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');

  const resetForm = () => {
    setTitle('');
    setDeadline('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title && deadline) {
      await addTodo({ title, deadline: new Date(deadline) });

      resetForm();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} placeholder="Add a todo" onChange={e => setTitle(e.target.value)} />
      <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
};
