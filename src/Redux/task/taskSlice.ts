import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TaskData {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  completed: boolean;
  tags: Array<String>;
}

interface TasksState {
  tasks: TaskData[];
  nextId: number;
  sortingCriteria: 'byDate' | 'byPriority';
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
      tags: ['work', 'remote'],
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Description for Task 2',
      dueDate: '2023-08-20',
      priority: 'Medium',
      completed: true,
      tags: ['speed', 'remote'],
    },
    // Add more tasks here
 
  ],   

  sortingCriteria: 'byDate',   
  nextId: 3, 
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskData>) => {
        const newTask = { ...action.payload, id: state.nextId };
        state.tasks.push(newTask);
        state.nextId++; // Increment the nextId for the next task
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
    sortTasks: (state, action: PayloadAction<'byDate' | 'byPriority'>) => {
      state.sortingCriteria = action.payload;
      if (action.payload === 'byDate') {
        state.tasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
      } else if (action.payload === 'byPriority') {
        state.tasks.sort((a, b) => a.priority.localeCompare(b.priority));
      }
    },
    searchTasks: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.toLowerCase();
      state.tasks.forEach(task => {
        if (task.title.toLowerCase().includes(searchTerm) || task.description.toLowerCase().includes(searchTerm)) {
          task.show = true;
        } else {
          task.show = false;
        }
      });
    },
  },
});

export const { addTask, updateTask, deleteTask, sortTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
