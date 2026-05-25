import { create } from 'zustand';
import { FilterType, Task } from '@/types/task';

interface TaskState {
  tasks: Task[];
  filter: FilterType;
  loading: boolean;
  error: string | null;

  setTasks: (tasks: Task[]) => void;
  addTask: (title: string) => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  setFilter: (filter: FilterType) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  filter: 'all',
  loading: false,
  error: null,

  setTasks: (tasks) => set({ tasks }),

  addTask: (title) =>
    set((state) => ({
      tasks: [
        {
          id: Date.now(),
          title,
          completed: false,
        },
        ...state.tasks,
      ],
    })),

  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      ),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),

  setFilter: (filter) => set({ filter }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),
}));