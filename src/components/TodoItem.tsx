import { useEffect, useRef, useState } from 'react';
import { Check, Pencil, Trash2, X } from 'lucide-react';
import clsx from 'clsx';
import type { Todo } from '@/types';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
};

export default function TodoItem({ todo, onToggle, onRemove, onUpdate }: TodoItemProps) {
  const [editing, setEditing] = useState<boolean>(false);
  const [draft, setDraft] = useState<string>(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const commit = () => {
    onUpdate(todo.id, draft);
    setEditing(false);
  };

  const cancel = () => {
    setDraft(todo.text);
    setEditing(false);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') commit();
    else if (e.key === 'Escape') cancel();
  };

  return (
    <li className="group flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm transition hover:shadow-md">
      <button
        type="button"
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark as active' : 'Mark as completed'}
        className={clsx(
          'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition',
          todo.completed
            ? 'border-brand bg-brand text-white'
            : 'border-slate-300 bg-white hover:border-brand',
        )}
      >
        {todo.completed && <Check size={14} strokeWidth={3} />}
      </button>

      {editing ? (
        <input
          ref={inputRef}
          type="text"
          value={draft}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={handleKey}
          className="flex-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-slate-800 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
      ) : (
        <span
          onDoubleClick={() => setEditing(true)}
          className={clsx(
            'flex-1 cursor-text select-none break-words text-slate-800',
            todo.completed && 'text-slate-400 line-through',
          )}
        >
          {todo.text}
        </span>
      )}

      <div className="flex items-center gap-1 opacity-0 transition group-hover:opacity-100">
        {editing ? (
          <button
            type="button"
            onClick={cancel}
            aria-label="Cancel"
            className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            aria-label="Edit"
            className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
          >
            <Pencil size={16} />
          </button>
        )}
        <button
          type="button"
          onClick={() => onRemove(todo.id)}
          aria-label="Delete"
          className="rounded-md p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </li>
  );
}
