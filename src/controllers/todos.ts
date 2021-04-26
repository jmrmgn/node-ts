import { RequestHandler } from 'express';

import { Todo } from '../models/todo';

const TODOS: Todo[] = [];

const getTodoIndex = (todoId: string): number => {
  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error('Could not find todo!');
  }

  return todoIndex;
};

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(String(Math.floor(Math.random() * 10) + 1), text);

  TODOS.push(newTodo);

  res.status(201).json({ message: 'Created the todo.', data: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.json(TODOS);
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;
  const updatedText = (req.body as { text: string }).text;

  const todoIndex = getTodoIndex(todoId);

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

  res.json({ message: 'Updated!', data: TODOS[todoIndex] });
};

export const deleteTodo: RequestHandler = (req, res, next) => {
  const todoId = req.params.id;

  const todoIndex = getTodoIndex(todoId);

  TODOS.splice(todoIndex, 1);

  res.json({ message: 'Todo deleted!' });
};
