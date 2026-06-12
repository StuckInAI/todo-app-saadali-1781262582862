import { useState } from 'react';
import { Plus } from 'lucide-react';

type AddTodoFormProps = {
  onAdd: (text: string) => void;
};

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [value, setValue] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;
    onAdd(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 placeholder-slate-400 shadow-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
      />
      <button
        type="submit"
        className="flex items-center gap-2 rounded-xl bg-brand px-4 py-3 font-medium text-white shadow-sm transition hover:bg-brand-dark active:scale-95"
      >
        <Plus size={18} />
        <span className="hidden sm:inline">Add</span>
      </button>
    </form>
  );
}
