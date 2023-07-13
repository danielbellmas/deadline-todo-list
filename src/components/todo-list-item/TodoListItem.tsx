import React, { FC, useState } from 'react';
import { Todo } from '../../types/todo';
import { formatDateYYYYMMDD } from '../../utils/date';
import './TodoListItem.css';

interface TodoListItemProps {
  todo: Todo;
  onRemove: (selectedTodo: Todo) => Promise<void>;
  onEdit: (selectedTodo: Todo) => Promise<void>;
}

export const TodoListItem: FC<TodoListItemProps> = ({ todo, onRemove, onEdit }) => {
  const { title, deadline } = todo;

  const [isEditable, setIsEditable] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDeadline, setNewDeadline] = useState(formatDateYYYYMMDD(new Date(deadline)));

  const onTodoChange = () => {
    onEdit({ ...todo, title: newTitle, deadline: new Date(newDeadline) });
    setIsEditable(false);
  };

  return isEditable ? (
    <div className="todo-item-edit">
      <input type="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} />
      <input
        type="date"
        value={newDeadline}
        onChange={e => setNewDeadline(formatDateYYYYMMDD(new Date(e.target.value)))}
      />
      <div className="action-buttons">
        <button onClick={onTodoChange}>Save</button>
        <button onClick={() => setIsEditable(false)}>Cancel</button>
      </div>
    </div>
  ) : (
    <div className="todo-item">
      <span>
        {title} is due on <span className="date">{new Date(deadline).toLocaleDateString()}</span>
      </span>
      <div className="action-buttons">
        <button onClick={() => setIsEditable(true)}>Edit</button>
        <button onClick={() => onRemove(todo)}>X</button>
      </div>
    </div>
  );
};
