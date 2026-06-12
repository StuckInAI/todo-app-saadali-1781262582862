import { useMemo, useState } from 'react';
import { ListChecks } from 'lucide-react';
import AddTodoForm from '@/components/AddTodoForm';
import TodoItem from '@/components/TodoItem';
import FilterBar from '@/components/FilterBar';
import { useTodos } from '@/hooks/useTodos';
import type { TodoFilter } from '@/types';

export default function HomePage() {
  const { todos, addTodo, toggleTodo, removeTodo, updateTodo, clearCompleted } = useTodos();
  const [filter, setFilter] = useState<TodoFilter>('all');

  const filtered = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.completed);
    if (filter === 'completed') return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  const remaining = todos.filter((t) => !t.completed).length;
  const hasCompleted = todos.some((t) => t.completed);

  return (
    <div className="min-h-full px-4 py-10 sm:py-16">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white shadow-md">
            <ListChecks size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Todos</h1>
            <p className="text-sm text-slate-500">Stay organized and get things done.</p>
          </div>
        </header>

        <div className="rounded-2xl bg-white/60 p-5 shadow-xl ring-1 ring-slate-200/60 backdrop-blur">
          <AddTodoForm onAdd={addTodo} />

          {todos.length > 0 && (
            <FilterBar
              filter={filter}
              onChange={setFilter}
              remaining={remaining}
              hasCompleted={hasCompleted}
              onClearCompleted={clearCompleted}
            />
          )}

          <ul className="mt-4 flex flex-col gap-2">
            {filtered.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onRemove={removeTodo}
                onUpdate={updateTodo}
              />
            ))}
          </ul>

          {todos.length === 0 && (
            <div className="mt-6 rounded-xl border border-dashed border-slate-200 bg-white/50 px-4 py-10 text-center">
              <p className="text-slate-500">No todos yet. Add your first one above! 🚀</p>
            </div>
          )}

          {todos.length > 0 && filtered.length === 0 && (
            <div className="mt-6 rounded-xl border border-dashed border-slate-200 bg-white/50 px-4 py-10 text-center">
              <p className="text-slate-500">Nothing here for this filter.</p>
            </div>
          )}
        </div>

        <footer className="mt-6 text-center text-xs text-slate-400">
          Double-click a todo to edit. Your list is saved locally.
        </footer>
      </div>
    </div>
  );
}
