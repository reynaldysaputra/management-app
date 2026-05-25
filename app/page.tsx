'use client';

import { useEffect } from 'react';
import TaskCard from '@/components/TaskCard';
import TaskFilter from '@/components/TaskFilter';
import TaskForm from '@/components/TaskForm';
import { useTaskStore } from '@/store/task.store';
import { getTasks } from '@/services/task.services';

export default function HomePage() {
  const {
    tasks,
    filter,
    loading,
    error,
    setTasks,
    setLoading,
    setError,
  } = useTaskStore();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);

        const data = await getTasks();

        setTasks(data);
      } catch (err) {
        setError('Failed to fetch tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [setTasks, setLoading, setError]);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;

    return true;
  });

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-2xl space-y-6 rounded-2xl bg-white p-6 shadow-lg">
        <div>
          <h1 className="text-3xl font-bold">
            Task Management App
          </h1>

          <p className="mt-1 text-gray-500">
            Next.js + TypeScript Technical Test
          </p>
        </div>

        <TaskForm />

        <TaskFilter />

        {loading && (
          <p className="text-center">Loading tasks...</p>
        )}

        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        <div className="space-y-3">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">
              No tasks found
            </p>
          )}
        </div>
      </div>
    </main>
  );
}