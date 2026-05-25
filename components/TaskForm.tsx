'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTaskStore } from '@/store/task.store';

const schema = z.object({
  title: z
    .string()
    .min(3, 'Task minimal 3 karakter')
    .max(50, 'Task terlalu panjang'),
});

type FormData = z.infer<typeof schema>;

export default function TaskForm() {
  const addTask = useTaskStore((state) => state.addTask);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    addTask(data.title);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-2"
    >
      <div className="flex gap-2">
        <input
          {...register('title')}
          type="text"
          placeholder="Add new task..."
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-black"
        />

        <button
          type="submit"
          className="rounded-lg bg-black px-4 py-2 text-white"
        >
          Add
        </button>
      </div>

      {errors.title && (
        <p className="text-sm text-red-500">
          {errors.title.message}
        </p>
      )}
    </form>
  );
}