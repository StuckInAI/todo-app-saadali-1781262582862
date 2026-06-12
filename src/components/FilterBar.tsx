import clsx from 'clsx';
import type { TodoFilter } from '@/types';

type FilterBarProps = {
  filter: TodoFilter;
  onChange: (filter: TodoFilter) => void;
  remaining: number;
  hasCompleted: boolean;
  onClearCompleted: () => void;
};

const FILTERS: { key: TodoFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
];

export default function FilterBar({
  filter,
  onChange,
  remaining,
  hasCompleted,
  onClearCompleted,
}: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-1 pt-2 text-sm text-slate-500">
      <span>
        {remaining} {remaining === 1 ? 'item' : 'items'} left
      </span>
      <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => onChange(f.key)}
            className={clsx(
              'rounded-md px-3 py-1 text-sm font-medium transition',
              filter === f.key
                ? 'bg-white text-brand shadow-sm'
                : 'text-slate-500 hover:text-slate-700',
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onClearCompleted}
        disabled={!hasCompleted}
        className="text-sm font-medium text-slate-500 transition hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-slate-500"
      >
        Clear completed
      </button>
    </div>
  );
}
