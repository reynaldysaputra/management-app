import axios from 'axios';
import { Task } from '@/types/task';

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get(BASE_URL + '?_limit=10');

  return response.data;
};