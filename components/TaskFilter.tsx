'use client';

import { FilterType } from '@/types/task';
import { useTaskStore } from '@/store/task.store';
import clsx from 'clsx';

const filters: FilterType[] = [
  'all',
  'completed',
  'pending',
];

export default function TaskFilter() {
  const filter = useTaskStore((state) => state.filter);
  const setFilter = useTaskStore((state) => state.setFilter);

  return (
    <div className="flex gap-2">
      {filters.map((item) => (
        <button
          key={item}
          onClick={() => setFilter(item)}
          className={clsx(
            'rounded-full px-4 py-2 text-sm capitalize transition',
            filter === item
              ? 'bg-black text-white'
              : 'bg-gray-100 text-black'
          )}
        >
          {item}
        </button>
      ))}
    </div>
  );
}