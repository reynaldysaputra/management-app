'use client';

import { Task } from '@/types/task';
import { useTaskStore } from '@/store/task.store';
import clsx from 'clsx';

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />

        <p
          className={clsx(
            'text-sm md:text-base',
            task.completed && 'text-gray-400 line-through'
          )}
        >
          {task.title}
        </p>
      </div>

      <button
        onClick={() => deleteTask(task.id)}
        className="text-sm text-red-500"
      >
        Delete
      </button>
    </div>
  );
}