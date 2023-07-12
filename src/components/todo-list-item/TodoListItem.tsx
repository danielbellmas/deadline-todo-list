import React, { FC, useState } from 'react';
import { Todo } from '../../types/todo';

interface TodoListItemProps {
  todo: Todo;
  onRemove: (selectedTodo: Todo) => Promise<void>;
  onEdit: (selectedTodo: Todo) => Promise<void>;
}

export const TodoListItem: FC<TodoListItemProps> = ({ todo, onRemove, onEdit }) => {
  const { title, deadline } = todo;

  const [isEditable, setIsEditable] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDeadline, setNewDeadline] = useState(new Date(deadline).toISOString());

  const onTodoChange = () => {
    onEdit({ ...todo, title: newTitle, deadline: new Date(newDeadline) });
    setIsEditable(false);
  };

  return isEditable ? (
    <div>
      <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
      <input type="date" value={newDeadline} onChange={e => setNewDeadline(e.target.value)} />
      <button onClick={onTodoChange}>Save</button>
      <button onClick={() => setIsEditable(false)}>Cancel</button>
    </div>
  ) : (
    <div>
      <span>
        {title} -&gt; {new Date(deadline).toLocaleDateString()}
      </span>
      <button onClick={() => setIsEditable(true)}>Edit</button>
      <button onClick={() => onRemove(todo)}>X</button>
    </div>
  );
};
