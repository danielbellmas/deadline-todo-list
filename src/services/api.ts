import axios from 'axios';
import { Todo } from '../types/todo';

export const fetchAllTodos = async () => {
  return (await axios.get<Todo[]>(`http://localhost:3001/todos`)).data;
};

export const updateTodo = async (todo: Todo) => {
  const { _id, ...rest } = todo;

  return (await axios.put<Todo>(`http://localhost:3001/todos/${_id}`, rest)).data;
};

export const createTodo = async (todo: Omit<Todo, '_id'>) => {
  return (await axios.post<Todo>(`http://localhost:3001/todos`, todo)).data;
};

export const deleteTodo = async (id: string) => {
  return (await axios.delete<Todo>(`http://localhost:3001/todos/${id}`)).data;
};
