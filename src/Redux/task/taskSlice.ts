import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TaskData {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  completed: boolean;
}

interface TasksState {
  tasks: TaskData[];
}

const initialState: TasksState = {
  tasks: [
    {
      id: 1,
      title: 'Task 1',
      description: 'Description for Task 1',
      dueDate: '2023-08-15',
      priority: 'High',
      completed: false,
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Description for Task 2',
      dueDate: '2023-08-20',
      priority: 'Medium',
      completed: true,
    },
    // Add more tasks here
  ],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskData>) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<TaskData>) => {
      const { id } = action.payload;
      const existingTask = state.tasks.find((task) => task.id === id);
      if (existingTask) {
        Object.assign(existingTask, action.payload);
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
