import { useEffect, useState } from 'react';
import type { Todo } from '@/types';
import { loadTodos, saveTodos } from '@/lib/storage';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setTodos(loadTodos());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveTodos(todos);
  }, [todos, loaded]);

  const addTodo = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newTodo: Todo = {
      id: Math.random().toString(36).slice(2) + Date.now().toString(36),
      text: trimmed,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const removeTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTodo = (id: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) {
      removeTodo(id);
      return;
    }
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t)),
    );
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  return { todos, addTodo, toggleTodo, removeTodo, updateTodo, clearCompleted };
}
